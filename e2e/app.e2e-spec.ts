import { LifeontimePage } from './app.po';

describe( 'life-on-time App', () => {
  let page: LifeontimePage;

  beforeEach( () => {
    page = new LifeontimePage();
  } );

  it( 'should expect true to be true', () => {
    expect( true ).toBe( true );
  } );
} );
