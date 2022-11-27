import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsNumber, IsString } from "class-validator";

export class LessonPayload {
  @ApiProperty()
  @IsDefined({ message: 'O título deve ser definido' })
  @IsString()
  public title: string;

  @ApiProperty()
  @IsDefined({ message: 'A URL do vídeo deve ser definida' })
  @IsString()
  public videoUrl: string;

  @ApiProperty()
  @IsDefined({ message: 'A identificação do módulo deve ser definida' })
  @IsNumber()
  public courseModuleId: number;
}
