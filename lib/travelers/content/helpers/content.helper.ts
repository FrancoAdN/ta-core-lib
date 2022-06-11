import { v4 as uuid } from 'uuid';

/**
 * Generates an S3 object key name based on the original filename
 * @param {string} filename    - Original filename
 * @returns {string}
 */
export const generateObjectKey = (filename: string): string => {
  const splitName = filename.split('.');
  const extension = splitName[splitName.length - 1];
  const UUID = uuid();
  return `${UUID}.${extension}`;
};

/**
 * Validates if the file size exceeds 10MB
 * @param {number}     size     - File size
 * @returns {boolean}
 */
export const validateFileSize = (size: number): boolean => {
  const MAX_FILE_SIZE = 1e7;
  return size > MAX_FILE_SIZE;
};

/**
 * Retrieves the S3 objectKey from a url
 * @param {string} url - Url of the S3 file
 * @returns {string} Object Key
 */
export const getObjectKeyFromUrl = (url: string): string => url.split('/')[3];
