/**
 * Created by Xin on 4/22/16.
 */

export default class UserAgentDetect {
  static isIOS = (userAgent)=> /iPhone|iPad|iPod|Macintosh/i.test(userAgent);

  static isAndroid = (userAgent)=> /Android/i.test(userAgent);

  static getDeviceName = (userAgent)=> {
    let deviceName;

    if (UserAgentDetect.isIOS(userAgent)) {
      deviceName = /iPhone|iPad|iPod|Macintosh/i.exec(userAgent)[0];
    } else if (UserAgentDetect.isAndroid(userAgent)) {
      deviceName = /([\w]+[\W])+(?=Build)/g.exec(userAgent)[0].trim();
    } else {
      deviceName = null;
    }
    return deviceName;
  };

  static getBrowser = (userAgent)=> {
    let browserName;
    let browserVersion;
    let regResult;

    regResult = /Safari\/(\S+(?=\"|\s))/ig.exec(userAgent);
    if (regResult) {
      browserName = 'Safari';
      browserVersion = regResult[1];
    }

    regResult = /Chrome\/(\S+(?=\"|\s))/ig.exec(userAgent);
    if (regResult) {
      browserName = 'Chrome';
      browserVersion = regResult[1];
    }

    regResult = /MQQBrowser\/(\S+(?=\"|\s))/ig.exec(userAgent);
    if (regResult) {
      browserName = 'MQQBrowser';
      browserVersion = regResult[1];
    }

    regResult = /MicroMessenger\/(\S+(?=\"|\s))/ig.exec(userAgent);
    if (regResult) {
      browserName = 'MicroMessenger';
      browserVersion = regResult[1];
    }

    return {
      browserName, browserVersion,
    };
  };

  static getOS = (userAgent)=> {
    let OSName;
    let OSVersion;
    let regResult;

    regResult = /Macintosh; Intel Mac OS X ([\d_]*)/ig.exec(userAgent);
    if (regResult) {
      OSName = 'Mac OS';
      OSVersion = regResult[1];
    }

    regResult = /(CPU|CPU iPhone) OS ([\d_]*) like Mac OS X/ig.exec(userAgent);
    if (regResult) {
      OSName = 'iOS';
      OSVersion = regResult[2];
    }

    regResult = /Android ([\d.]*)/ig.exec(userAgent);
    if (regResult) {
      OSName = 'Android';
      OSVersion = regResult[1];
    }

    return { OSName, OSVersion };
  };

  constructor(userAgent) {
    const { browserName, browserVersion } = UserAgentDetect.getBrowser(userAgent);
    const { OSName, OSVersion } = UserAgentDetect.getOS(userAgent);
    const deviceName = UserAgentDetect.getDeviceName(userAgent);

    this.browser = {
      name: browserName,
      version: browserVersion,
    };

    this.OS = {
      name: OSName,
      version: OSVersion,
    };

    this.device = deviceName;
  }
}
