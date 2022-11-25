import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import * as bcryptjs from "bcryptjs";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../entities/user.entity";
import { UserPayload } from "../models/user.payload";
import { BaseService } from "../../../base/base.service";

@Injectable()
export class UserService extends BaseService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    repository: Repository<UserEntity>
  ) {
    super(repository);
  }

  public findAll(): Promise<UserEntity[]> {
    return this.repository.find();
  }

  public findOne(id: number): Promise<UserEntity> {
    return this.repository.findOneBy({ id });
  }

  public async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  public async create(payload: UserPayload): Promise<UserEntity> {
    const user = new UserEntity();

    user.email = payload.email;
    user.name = payload.name;
    user.imageUrl = payload.imageUrl;

    const salt = await bcryptjs.genSalt();
    user.password = await bcryptjs.hash(payload.password, salt);

    user.isActive = payload.isActive;

    return await this.repository.save(user);
  }

  public async update(payload: UserPayload, id: number): Promise<UserEntity> {
    const oldEntity = await this.repository.findOneBy({ id });

    const user = new UserEntity();

    user.email = payload.email;
    user.name = payload.name;
    user.imageUrl = payload.imageUrl;
    user.password = payload.password;
    user.isActive = payload.isActive;

    const entity = {
      ...oldEntity,
      ...user
    };

    return await this.repository.save(entity);
  }
}
