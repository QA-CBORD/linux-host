import { VarDirective } from "./ng-var.directive";
import { ViewContainerRef, TemplateRef } from "@angular/core";

describe("VarDirective", () => {
  it("should create an instance", () => {
    const vcRefMock = {} as ViewContainerRef;
    const templateRefMock = {} as TemplateRef<any>;
    const directive = new VarDirective(vcRefMock, templateRefMock);
    expect(directive).toBeTruthy();
  });
  it("should update view", () => {
    const vcRefMock = {
      clear: jest.fn(),
      createEmbeddedView: jest.fn(),
    } as any as ViewContainerRef;
    const templateRefMock = {} as TemplateRef<any>;
    const directive = new VarDirective(vcRefMock, templateRefMock);
    directive.ngVar = "test";
    expect(vcRefMock.clear).toHaveBeenCalled();
    expect(vcRefMock.createEmbeddedView).toHaveBeenCalled();
  });
  
});
