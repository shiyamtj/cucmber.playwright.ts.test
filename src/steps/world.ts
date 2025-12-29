import { setWorldConstructor, World } from '@cucumber/cucumber';

export class CustomWorld extends World {
  // You can add custom properties to the world here
}

setWorldConstructor(CustomWorld);
