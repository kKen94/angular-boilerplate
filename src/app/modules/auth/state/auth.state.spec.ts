// import { NgxsModule, Store } from '@ngxs/store';
// import { async, TestBed } from '@angular/core/testing';
// import { AuthState } from './auth.state';
//
// describe('Bubba actions', () => {
//   let store: Store;
//
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       imports: [NgxsModule.forRoot([AuthState])]
//     }).compileComponents();
//     store = TestBed.get(Store);
//   }));
//
//   it('should create an action and add an item', () => {
//     store.dispatch(new AuthAction('item-1'));
//     store.select(state => state.bubba.items).subscribe((items: string[]) => {
//       expect(items).toEqual(jasmine.objectContaining([ 'item-1' ]));
//     });
//   });
//
// });
