import { Injectable } from '@nestjs/common';
import { S3Service } from '../../s3/s3.service';
import { Readable } from 'stream';
import { generateObjectKey } from '../helpers/content.helper';
import { ImagePayloadDto } from '../../dtos';

@Injectable()
export class ContentService extends S3Service {
  bucketName: string;
  constructor() {
    super();
    this.bucketName = process.env.AWS_BUCKET_NAME || '';
  }

  /**
   * Uploads Media Content to S3
   * @param {contentDto}  mediaContentMultipart    - Multipart file properties
   */
  upload(contentDto: ImagePayloadDto, stream: Readable) {
    /* istanbul ignore next */
    return this.uploadObject(
      this.bucketName,
      generateObjectKey(contentDto.originalname),
      stream,
      contentDto.mimetype,
      contentDto.size,
    );
  }

  /**
   * Delete failed object during insertion
   * @param {string}    key    - S3 Object Key name
   */
  deleteMediaContent(key: string) {
    return this.deleteObject(this.bucketName, key);
  }

  /**
   * Determines if the key exists in the bucket
   * @param {string} Key  - S3 Object Key i.e. 8f5b5fa2-ae79-4570-add7-21119cbb3ad3.png
   * @returns {Promise<boolean>} whether the object exists
   */
  objectExistsInBucket(Key: string): Promise<boolean> {
    return this.existsInBucket({
      Key,
      Bucket: this.bucketName,
    });
  }
}
