import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Chart } from 'chart.js';

import { VoteProvider } from '../../providers/vote/vote';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('chartCanvas') chartCanvas;
  
  dopes: number;
  nopes: number;
  chartVar: any;
  voted: boolean = false;

  constructor(public navCtrl: NavController, public voteService: VoteProvider) {
    this.voteService.getAllVotes().subscribe((votes: any) => {
      this.dopes = votes[0].dopes;
      this.nopes = votes[0].nopes;
    })
  }

  dope() {
    this.dopes += 1;
    this.voted = true;
    this.voteService.addNewVote({
      dopes: this.dopes,
      nopes: this.nopes
    })
    this.showChart();
  }

  nope() {
    this.nopes += 1;
    this.voted = true;
    this.voteService.addNewVote({
      dopes: this.dopes,
      nopes: this.nopes
    })
    this.showChart();
  }

  showChart() {
    
    this.chartVar = new Chart(this.chartCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [this.dopes, this.nopes],
          backgroundColor: [
            'rgba(41, 255, 122, 1)',
            'rgba(255, 148, 12, 1)'
          ]
        }],
        labels: [
          'dope',
          'nope'
        ]

      },

      options: {
        legend: {
          display: false
        },
        tooltips: {
          enabled: true
        }
      }

    })
  }

}
