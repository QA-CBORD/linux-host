import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'st-html-renderer',
  templateUrl: './html-renderer.component.html',
  styleUrls: ['./html-renderer.component.scss'],
})
export class HTMLRendererComponent implements OnInit {

  @Input() htmlContent: string;
  @Input() buttons: any[];

  constructor() { }

  ngOnInit() {}

}
