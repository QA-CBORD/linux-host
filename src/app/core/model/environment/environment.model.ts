export enum EnvironmentType {
  develop,
  feature1,
  pat,
  qa,
  demo,
  production,
  productionCanada = 'Canada',
  developCanada = 'Canada Dev',
}

export interface EnvironmentInfo {
  environment: EnvironmentType;
  services_url: string;
  site_url: string;
  secmsg_api: string;
  image_url: string;
  housing_aws_url: string;
  partner_services_url?: string;
}

export const ENVIRONMENTS_MAP: { [key: string]: EnvironmentInfo } = {
  [EnvironmentType.production]: {
    environment: EnvironmentType.production,
    services_url: 'https://services.get.cbord.com/GETServices/services',
    site_url: 'https://get.cbord.com',
    secmsg_api: 'https://secmsg.api.cbord.com',
    image_url: 'https://object-store.api.cbord.com/image/',
    housing_aws_url: 'https://api.housing.cbord.com',
    partner_services_url: 'https://api.partnerpayments.cbord.com',
  },
  [EnvironmentType.demo]: {
    environment: EnvironmentType.demo,
    services_url: 'https://services.get.demo.cbord.com/GETServices/services',
    site_url: 'https://get.demo.cbord.com',
    secmsg_api: 'https://secmsg.api.demo.cbord.com',
    image_url: 'https://object-store.api.demo.cbord.com/image/',
    housing_aws_url: 'https://z4ffq7e1m9.execute-api.us-east-1.amazonaws.com/dev',
    partner_services_url: 'https://api.payments.demo.cbord.com',
  },
  [EnvironmentType.pat]: {
    environment: EnvironmentType.pat,
    services_url: 'https://services.get.pat.cbord.com/GETServices/services',
    site_url: 'https://get.pat.cbord.com',
    secmsg_api: 'https://secmsg.api.pat.cbord.com',
    image_url: 'https://object-store.api.pat.cbord.com/image/',
    housing_aws_url: 'https://z6u8er70s9.execute-api.us-east-1.amazonaws.com/dev',
    partner_services_url: 'https://api.partnerpayments.pat.cbord.com',
  },
  [EnvironmentType.qa]: {
    environment: EnvironmentType.qa,
    services_url: 'https://services.get.qa.cbord.com/GETServices/services',
    site_url: 'https://get.qa.cbord.com',
    secmsg_api: 'https://secmsg.api.qa.cbord.com',
    image_url: 'https://object-store.api.qa.cbord.com/image/',
    housing_aws_url: 'https://z4ffq7e1m9.execute-api.us-east-1.amazonaws.com/qa',
    partner_services_url: 'https://api.payments.qa.cbord.com',
  },
  [EnvironmentType.feature1]: {
    environment: EnvironmentType.feature1,
    services_url: 'https://services.get.feature1.cbord.com/GETServices/services',
    site_url: 'https://get.feature1.cbord.com',
    secmsg_api: 'https://secmsg.api.dev.cbord.com',
    image_url: 'https://3bulchr7pb.execute-api.us-east-1.amazonaws.com/dev/image/',
    // image_url: 'https://object-store.api.feature1.cbord.com/image/', once DNS entry is entered
    housing_aws_url: 'https://z6u8er70s9.execute-api.us-east-1.amazonaws.com/dev',
  },
  [EnvironmentType.develop]: {
    environment: EnvironmentType.develop,
    services_url: 'https://services.get.dev.cbord.com/GETServices/services',
    site_url: 'https://get.dev.cbord.com',
    secmsg_api: 'https://secmsg.api.dev.cbord.com',
    image_url: 'https://3bulchr7pb.execute-api.us-east-1.amazonaws.com/dev/image/',
    // image_url :  'https://object-store.api.dev.cbord.com/image/', once DNS entry is entered
    housing_aws_url: 'https://5yu7v7hrq2.execute-api.us-east-1.amazonaws.com/dev',
    partner_services_url: 'https://api.partnerpayments.pat.cbord.com',
  },
  [EnvironmentType.productionCanada]: {
    environment: EnvironmentType.productionCanada,
    services_url: 'https://services.get.ca.cbord.com/GETServices/services',
    site_url: 'https://get.ca.cbord.com',
    secmsg_api: 'https://secmsg.api.ca.cbord.com',
    image_url: 'https://object-store.api.ca.cbord.com/image/',
    housing_aws_url: 'https://api.housing.ca.cbord.com',
    partner_services_url: 'https://api.partnerpayments.ca.cbord.com',
  },
  [EnvironmentType.developCanada]: {
    environment: EnvironmentType.developCanada,
    services_url: 'https://services.get.dev.cbord.com/GETServices/services',
    site_url: 'https://get.dev.cbord.com',
    secmsg_api: 'https://secmsg.api.dev.cbord.com',
    image_url: 'https://3bulchr7pb.execute-api.us-east-1.amazonaws.com/dev/image/',
    housing_aws_url: 'https://5yu7v7hrq2.execute-api.us-east-1.amazonaws.com/dev',
  },
};
