import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './bootstrap/css/bootstrap-grid.min.css',
  './bootstrap/css/bootstrap-reboot.min.css', './bootstrap/css/bootstrap.min.css'
]
})
export class AppComponent {
  title = 'eFiskalizacija';

  constructor() { 
    this.loadScripts(); 
  }

  loadScripts() { 

    // This array contains all the files/CDNs 
    const dynamicScripts = [ 
        'assets/slike.js',
        '../assets/js/ocanvas-2.10.0.min.js',
    ]; 
    for (let i = 0; i < dynamicScripts.length; i++) { 
      const node = document.createElement('script'); 
      node.src = dynamicScripts[i]; 
      node.type = 'text/javascript'; 
      node.async = false; 
      document.getElementsByTagName('head')[0].appendChild(node); 
    } 
  } 
}
