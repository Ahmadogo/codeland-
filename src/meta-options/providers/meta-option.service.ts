import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MetaOption } from '../meta-option.entity';
import { CreatePostMetaOptionsDto } from '../dto/create-meta-option.dto';
import { UpdateMetaOptionDto } from '../dto/update-meta-option.dto';

@Injectable()
export class MetaOptionsService {
  constructor(
    @InjectRepository(MetaOption) private metaRepository: Repository<MetaOption>,
  ) {}

  public async create(createMetaOptionDto: CreatePostMetaOptionsDto): Promise<MetaOption> {
    const metaOption = this.metaRepository.create(createMetaOptionDto);
    return await this.metaRepository.save(metaOption);
  }

  // public async findAll(): Promise<MetaOption[]> {
  //   return await this.metaRepository.find();
  // }

  // public async findOne(id: number): Promise<MetaOption> {
  //   return await this.metaRepository.findOne({ where: { id } });
  // }

  // public async update(id: number, updateMetaOptionDto: UpdateMetaOptionDto): Promise<MetaOption> {
  //   await this.metaRepository.update(id, updateMetaOptionDto);
  //   return await this.metaRepository.findOne({ where: { id } });
  // }

  // public async remove(id: number): Promise<void> {
  //   await this.metaRepository.delete(id);
  // }
}
