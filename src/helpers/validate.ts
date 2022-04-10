import Ajv from 'ajv';
import log from '$helpers/log';
import addFormat from 'ajv-formats';
import { stop } from './response';
import { ErrorCode } from '$types/enums';
import { head } from 'lodash';
const logger = log('Validate');

const AjvInstance = new Ajv();

addFormat(AjvInstance);

export function validate(schemaKeyRef: AjvSchema, data: any) {
  const validate = AjvInstance.validate(schemaKeyRef as any, data);

  if (validate) return;

  logger.error(AjvInstance.errors);
  throw stop(ErrorCode.Invalid_Input, head(AjvInstance.errors), 422);
}
