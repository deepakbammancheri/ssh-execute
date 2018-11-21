
import SSH2Promise = require('ssh2-promise');
//import ssh2 = require('ssh2')


export class sshExecute {

  host: string;
  username: string;
  password: string;
  connection;
  ssh;
  sshconfig;
  constructor() { }


  init() {
    this.sshconfig = {
      host: this.host,
      username: this.username,
      password: this.password
    }
    this.ssh = new SSH2Promise(this.sshconfig);
  }

  /**
   * Method to create SSH connection
   */
  async connectSSH() {
    console.log('Connecting to SSH client');
    await this.ssh.connect({
      host: this.host,
      username: this.username,
      password: this.password
    });
    console.log('ssh connection eztablished:');
  }


  /**
   * Method to execute the commands post creating the connection
   * @param hostname 
   * @param user 
   * @param passwd 
   * @param command 
   */
  async executeCommand(hostname: string, user: string, passwd: string, command: string) {
    this.host = hostname;
    this.username = user;
    this.password = passwd;

    console.log('Host name: ' + this.host);
    console.log('Username: ' + this.username);
    console.log('Password: ' + this.password);

    this.init();
    this.connectSSH();
    return await this.ssh.exec(command);

  }
}