import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

/*
  Generated class for the VoteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class VoteProvider {

  constructor(public afs: AngularFirestore) {
    
  }

  addNewVote(newVote) {
    const query = this.afs.collection('votes').ref;

    query.get().then((snapShot) => {
      this.afs.doc('votes/' + snapShot.docs[0].id).update(newVote);
    })
  }

  getAllVotes() {
    return this.afs.collection('votes').valueChanges();
  }


}
