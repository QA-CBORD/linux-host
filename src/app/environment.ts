enum Development {
  services_url = 'https://services.get.dev.cbord.com/GETServices/services',
  site_url = 'http://get.dev.cbord.com',
  cbordstudent_url = 'https://student.dev.cbord.com',
  secmsg_api = 'https://secmsg.api.dev.cbord.com',
  image_url = 'https://3bulchr7pb.execute-api.us-east-1.amazonaws.com/dev/image/',
  // image_url = 'https://object-store.api.dev.cbord.com/image/', once DNS entry is entered
  housing_aws_url = 'https://housing.api.dev.cbord.com',
}

enum Feature1 {
  services_url = 'https://services.get.feature1.cbord.com/GETServices/services',
  site_url = 'http://get.feature1.cbord.com',
  cbordstudent_url = 'https://student.feature1.cbord.com',
  secmsg_api = 'https://secmsg.api.dev.cbord.com',
  image_url = 'https://3bulchr7pb.execute-api.us-east-1.amazonaws.com/dev/image/',
  // image_url = 'https://object-store.api.feature1.cbord.com/image/', once DNS entry is entered
  housing_aws_url = 'https://housing.api.dev.cbord.com',
}

enum Qa {
  services_url = 'https://services.get.qa.cbord.com/GETServices/services',
  site_url = 'http://get.qa.cbord.com',
  cbordstudent_url = 'https://student.qa.cbord.com',
  secmsg_api = 'https://secmsg.api.qa.cbord.com',
  image_url = 'https://object-store.api.qa.cbord.com/image/',
  housing_aws_url = 'https://housing.api.qa.cbord.com',
}

enum Pat {
  services_url = 'https://services.get.pat.cbord.com/GETServices/services',
  site_url = 'http://get.pat.cbord.com',
  cbordstudent_url = 'https://student.pat.cbord.com',
  secmsg_api = 'https://secmsg.api.pat.cbord.com',
  image_url = 'https://object-store.api.pat.cbord.com/image/',
  housing_aws_url = 'https://housing.api.pat.cbord.com',
}

enum Demo {
  services_url = 'https://services.get.demo.cbord.com/GETServices/services',
  site_url = 'http://get.demo.cbord.com',
  cbordstudent_url = 'https://student.demo.cbord.com',
  secmsg_api = 'https://secmsg.api.demo.cbord.com',
  image_url = 'https://object-store.api.demo.cbord.com/image/',
  housing_aws_url = 'https://housing.api.demo.cbord.com',
}

enum Production {
  services_url = 'https://services.get.cbord.com/GETServices/services',
  site_url = 'http://get.cbord.com',
  cbordstudent_url = 'https://student.cbord.com',
  secmsg_api = 'https://secmsg.api.cbord.com',
  image_url = 'https://object-store.api.cbord.com/image/',
  housing_aws_url = 'https://housing.api.cbord.com',
}

export class Environment {
  static currentEnvironment = Development;
  constructor() {}

  static getServicesURL(): string {
    return Environment.currentEnvironment.services_url;
  }

  static getSecureMessagingAPIURL(): string {
    return Environment.currentEnvironment.secmsg_api;
  }

  static getImageURL(): string {
    return Environment.currentEnvironment.image_url;
  }

  static setEnvironment(newEnvironment) {
    Environment.currentEnvironment = newEnvironment;
  }

  static setEnvironmentViaURL(appBaseURL: string) {
    if (appBaseURL.includes('dev')) {
      this.setEnvironment(Development);
    } else if (appBaseURL.includes('feature1')) {
      this.setEnvironment(Feature1);
    } else if (appBaseURL.includes('qa')) {
      this.setEnvironment(Qa);
    } else if (appBaseURL.includes('pat')) {
      this.setEnvironment(Pat);
    } else if (appBaseURL.includes('demo')) {
      this.setEnvironment(Demo);
    } else if (appBaseURL.includes('student.cbord')) {
      this.setEnvironment(Production);
    } else {
      this.setEnvironment(Development);
    }
  }

  static isDevelopmentEnvironment(appBaseURL: string): boolean {
    return appBaseURL.includes('dev') || appBaseURL.includes('localhost');
  }
}
