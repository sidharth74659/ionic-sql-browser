import { Component, OnInit } from '@angular/core';
import { SqlService } from '../services/sql.service';
import { ToastController } from '@ionic/angular';
import { ISelectOptions } from '../services/sql.interface';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  sqlCommands: ISelectOptions[] = [];
  advancedSqlCommands: ISelectOptions[] = [];

  query: string = '';
  result: any[] = [];

  constructor(private sqlService: SqlService, private toastController: ToastController) { }

  async ngOnInit() {
    await this.sqlService.initializeDatabase();
    this.sqlCommands = this.sqlService.getSqlCommands();
    this.advancedSqlCommands = this.sqlService.getAdvancedSqlCommands();

    this.executeQuery('CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT)');
    this.executeQuery('INSERT INTO users (name, email) VALUES ("John Doe", "john@example.com")');
    this.executeQuery(`INSERT INTO users (name, email) VALUES ("Alice", "alice@example.com");UPDATE users SET email = 'newalice@example.com' WHERE name = 'Alice'`);

    // Display the first command by default
    this.executeQuery(this.sqlCommands[0].value);
    console.clear();
    this.checkStorage();
  }

  async checkStorage() {
    if (navigator?.storage?.estimate) {
      const quota = await navigator.storage.estimate();
      if (quota.usage == null || quota.quota == null) {
        console.warn('Unable to estimate storage quota.');
        return;
      }

      const percentageUsed = ((quota.usage) / (quota.quota)) * 100;
      console.info(`You've used ${percentageUsed}% of the available storage.`);
      console.info(`You can use up to ${Math.round(quota.quota / (1024 * 1024))} MB.`);
    }
  }

  setDefaultQuery(event: any) {
    this.query = event.detail.value;
    this.executeQuery();
  }

  executeQuery(query: string = this.query) {
    this.query = query;
    // console.trace('Executing query:', query);
    try {
      // this.result = [];
      console.time(`Query execution time: "${query}" `);
      this.result = this.sqlService.executeQuery(query);
      console.timeEnd(`Query execution time: "${query}" `);
      // this.displayUpdatedTable();
    } catch (error: any) {
      console.error('Error executing query:', error);
      this.presentToast(error.message.toString()); // Show error message using toast
    }
  }
  /* 
    displayUpdatedTable() {
      this.result = this.sqlService.executeQuery('SELECT * FROM users');
    }
  */

  async presentToast(errorMessage: any) {
    const toast = await this.toastController.create({
      message: errorMessage,
      duration: 1500, // Toast will be displayed for 3 seconds
      position: 'top', // Position of the toast can be 'top', 'middle', or 'bottom'
      color: 'danger'
    });
    toast.present();
  }

}