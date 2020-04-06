import { Injectable } from '@angular/core';
import { SwUpdate} from '@angular/service-worker';

@Injectable({
  providedIn: 'root'
})
export class PwaService {

  promptEvent;

  constructor(private swUpdate: SwUpdate) { 

    window.addEventListener('beforeinstallprompt', (event)=>{
      this.promptEvent = event;
    });

    if(this.swUpdate.isEnabled){
      this.swUpdate.available.subscribe((event)=>{
        if (confirm("New version available. Load New Version?")) {
          window.location.reload();
        }
      });
    }
  
  }
}
