import { IsOptional, IsInt } from "class-validator";
import { Type } from "class-transformer";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class GetUserParamDto {
  @ApiPropertyOptional(
    {
      description: "must write something",
      example: 1234
    }
  )
  @IsOptional()
  @IsInt()
  @Type(() => Number)
    id? : number
}
