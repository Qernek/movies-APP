import { Pipe, PipeTransform } from '@angular/core';
import { Actor } from '../models/actors';

/**
 * Pipe to search the actor in actorList by the id
 */

@Pipe({
  name: 'findActor',
})
export class ActorsPipe implements PipeTransform {
  actor: Actor | undefined;

  transform(actorId: number | string, actorList: Actor[]) {
    this.actor = actorList.find((actor) => actor.id === +actorId);
    if (!this.actor) return;
    const actorName = this.actor.first_name + ' ' + this.actor.last_name;
    return actorName;
  }
}
