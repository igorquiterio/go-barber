import IParseMailTemplateDTO from '@shared/container/providers/MailTemplateProvider/dtos/IParseMailTemplateDTO';

export default interface IParseMailTemplateProvider {
  parse(data: IParseMailTemplateDTO): Promise<string>;
}
