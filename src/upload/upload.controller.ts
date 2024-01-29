import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AzureBlobService } from './upload.service';
import { UploadParams } from './upload.dto';

@Controller('upload')
export class UploadController {
  containerName = "upload-images";
  constructor(private readonly azureBlobService: AzureBlobService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() uploadParams: UploadParams,) {
    await  this.azureBlobService.upload(file, this.containerName, uploadParams.startTimestamp, uploadParams.endTimestamp, uploadParams.camera);
    return 'file uploaded';
  }
}
