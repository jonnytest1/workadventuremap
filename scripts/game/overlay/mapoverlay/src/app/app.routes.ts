import { Route } from '@angular/router';
import { FriendsComponent } from './friends/friends.component';
import { MiroComponent } from './miro/miro.component';

export const routes: Array<Route> = [{
    path: 'friends',
    component: FriendsComponent
}, {
    path: "miro",
    component: MiroComponent
}];
