import {
  ApplicationRef,
  ComponentFactory,
  ComponentFactoryResolver,
  Injector,
  NgZone,
  Type,
  ViewRef,
  ɵNG_COMP_DEF,
  ɵNoopNgZone,
  ɵRender3ComponentFactory,
} from '@angular/core';
import { createCustomElement, NgElementConfig, NgElementConstructor } from '@angular/elements';

class IvyComponentFactoryResolver extends ComponentFactoryResolver {
  resolveComponentFactory<T>(component: Type<T>): ComponentFactory<T> {
    return new ɵRender3ComponentFactory((component as any)[ɵNG_COMP_DEF]);
  }
}

class NoopApplicationRef {
  attachView(viewRef: ViewRef): void {}
}

export function createCustomIvyElement<P>(
  component: Type<any>,
  config?: NgElementConfig
): NgElementConstructor<P> {
  if (!config) {
    config = { injector: Injector.NULL };
  }

  config.injector = Injector.create({
    name: 'IvyElementInjector',
    parent: config.injector,
    providers: [
      {
        provide: ApplicationRef,
        useFactory: () => new NoopApplicationRef(),
      },
      {
        provide: ComponentFactoryResolver,
        useFactory: () => new IvyComponentFactoryResolver(),
      },
      {
        provide: NgZone,
        useClass: ɵNoopNgZone,
      },
    ],
  });

  return createCustomElement(component, config);
}
