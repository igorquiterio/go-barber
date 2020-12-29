interface ITemplateVariables {
  [key: string]: string | number;
}

export default interface IParseMailTemplateDTO {
  template: string;
  varibles: ITemplateVariables;
}
