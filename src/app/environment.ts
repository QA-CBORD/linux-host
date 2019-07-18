enum Development {
  services_url = 'https://services.get.dev.cbord.com/GETServices/services',
  site_url = 'http://get.dev.cbord.com',
  cbordstudent_url = 'https://student.dev.cbord.com',
  secmsg_api = 'https://secmsg.api.dev.cbord.com',
}

enum Feature1 {
  services_url = 'https://services.get.feature1.cbord.com/GETServices/services',
  site_url = 'http://get.feature1.cbord.com',
  cbordstudent_url = 'ec2-3-80-152-98.compute-1.amazonaws.com',
  secmsg_api = 'https://secmsg.api.dev.cbord.com',
}

enum Qa {
  services_url = 'https://services.get.qa.cbord.com/GETServices/services',
  site_url = 'http://get.qa.cbord.com',
  cbordstudent_url = 'https://student.qa.cbord.com',
  secmsg_api = 'https://secmsg.api.qa.cbord.com',
}

enum Pat {
  services_url = 'https://services.get.pat.cbord.com/GETServices/services',
  site_url = 'http://get.pat.cbord.com',
  cbordstudent_url = 'https://student.pat.cbord.com',
  secmsg_api = 'https://secmsg.api.pat.cbord.com',
}

enum Demo {
  services_url = 'https://services.get.demo.cbord.com/GETServices/services',
  site_url = 'http://get.demo.cbord.com',
  cbordstudent_url = 'https://student.demo.cbord.com',
  secmsg_api = 'https://secmsg.api.demo.cbord.com',
}

enum Production {
  services_url = 'https://services.get.cbord.com/GETServices/services',
  site_url = 'http://get.cbord.com',
  cbordstudent_url = 'https://student.cbord.com',
  secmsg_api = 'https://secmsg.api.cbord.com',
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

  static setEnvironment(newEnvironment) {
    Environment.currentEnvironment = newEnvironment;
  }

  static setEnvironmentViaURL(appBaseURL: string) {
    if (appBaseURL.includes('dev')) {
      this.setEnvironment(Development);
    } else if (appBaseURL.includes('feature1')) {
      this.setEnvironment(Feature1);
    }else if (appBaseURL.includes('qa')) {
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
