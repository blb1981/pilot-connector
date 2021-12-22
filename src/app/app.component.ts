import { Component } from '@angular/core';
import {Job} from './jobs/job.model'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Pilot Connector';
  summary = 'Free job postings for pilots'
  storedJobs: Job[] = []

  onJobAdded(job: Job) {
    
    
    this.storedJobs.push(job)
    console.log(this.storedJobs)
  }

}
