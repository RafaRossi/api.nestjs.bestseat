import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { LessonEntity } from "../entities/lesson.entity";
import { LessonPayload } from "../models/lesson.payload";
import { BaseService } from "../../../base/base.service";

@Injectable()
export class LessonService extends BaseService<LessonEntity> {

  constructor(
    @InjectRepository(LessonEntity)
    repository: Repository<LessonEntity>
  ) {
    super(repository);
  }

  public async findAll(): Promise<LessonEntity[]> {
    return await this.repository.find();
  }

  public async findOne(id: number): Promise<LessonEntity> {
    return await this.repository.findOneBy({ id });
  }

  public async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  public async create(payload: LessonPayload): Promise<LessonEntity> {
    const course = new LessonEntity();

    course.title = payload.title;
    course.description = payload.description;
    course.videoUrl = payload.videoUrl;
    course.courseModuleId = payload.courseModuleId;

    return await this.repository.save(course);
  }

  public async createMany(payload: LessonPayload[]): Promise<LessonEntity[]> {
    const lessons = [];

    for (const lessonPayload of payload) {
      const lesson = new LessonEntity();

      lesson.title = lessonPayload.title;
      lesson.description = lessonPayload.description;
      lesson.videoUrl = lessonPayload.videoUrl;
      lesson.courseModuleId = lessonPayload.courseModuleId;

      lessons.push(lesson);
    }

    return await this.repository.save(lessons);
  }

  public async update(
    payload: LessonPayload,
    id: number
  ): Promise<LessonEntity> {
    const oldEntity = await this.repository.findOneBy({ id });

    const lesson = new LessonEntity();

    lesson.title = payload.title ?? oldEntity.title;
    lesson.description = payload.description ?? oldEntity.description;

    const entity = {
      ...oldEntity,
      ...lesson
    };

    return await this.repository.save(entity);
  }
}
