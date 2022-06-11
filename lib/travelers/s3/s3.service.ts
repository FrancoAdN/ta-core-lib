import * as AWS from 'aws-sdk';
import { Readable } from 'stream';
export abstract class S3Service {
  s3: AWS.S3;
  constructor() {
    this.s3 = new AWS.S3({
      signatureVersion: 'v4',
      accessKeyId: String(process.env.AWS_ACCESS_KEY_ID),
      secretAccessKey: String(process.env.AWS_SECRET_ACCESS_KEY),
    });
  }

  /**
   * Returns true if the object with the given key exists in the given bucket
   * @param {Bucket: string, Key: string} params - Objects key and bucket name
   * @returns {Boolean} - Boolean indicating the existence of the object
   */
  async existsInBucket(params: {
    Bucket: string;
    Key: string;
  }): Promise<boolean> {
    try {
      await this.s3.headObject(params).promise();
      return true;
    } catch (error) {
      /* eslint-disable-next-line no-console */
      console.error(error);
    }
    return false;
  }

  /**
   * Uploads a file to the specified bucket and with the specified key
   * @param {string}   bucketName - Name of the bucket
   * @param {string}   objectKey  - Key of the object to upload
   * @param {Readable} stream     - Readable stream of the file to upload
   * @param {string}   type       - Type of the object to upload
   * @param {number}   length     - Length of the object to upload
   * @returns {Promise<AWS.S3.ManagedUpload.SendData>} Data regarding the uploaded object
   */
  async uploadObject(
    bucketName: string,
    objectKey: string,
    stream: Readable,
    type: string,
    length?: number,
  ): Promise<AWS.S3.ManagedUpload.SendData> {
    let result;
    try {
      result = await this.s3
        .upload({
          Bucket: bucketName,
          Key: objectKey,
          Body: stream,
          ContentLength: length,
          ContentType: type,
        })
        .promise();
    } catch (error) {
      /* eslint-disable-next-line no-console */
      console.error(
        S3Service.name,
        `Error: uploading process failed for file: ${objectKey}`,
      );
    }
    return result;
  }

  /**
   * Deletes an specified object from the specified S3 bucket
   * @param {string} bucketName - Name of the bucket
   * @param {string} objectKey  - Key of the object to delete
   */
  async deleteObject(bucketName: string, objectKey: string) {
    this.s3
      .deleteObject({
        Bucket: bucketName,
        Key: objectKey,
      })
      .promise();
  }
}
