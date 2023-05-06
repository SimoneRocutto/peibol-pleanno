import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('casaAperta', {static: true}) casaAperta: ElementRef;

  title = 'Il biglietto di auguri + bello di tt';

  imgStatus = 0;

  polpoIsAlive = true;

  polpoIsOnLeft = false;

  polpoHasBeenResurrected = false;

  aaaaIsVisible = false;

  bottiPartiti = false;

  audioBotti: HTMLAudioElement;

  bottiTimeout: any;

  tocToc = () => {
    if (this.imgStatus < 2) {
      this.progressImgStatus();
    }
  }

  onCasaApertaClick = () => {
    if (this.imgStatus > 1 && this.imgStatus < 3) {
      this.progressImgStatus()
    }
  }

  casaFadeOut = () => {
    this.casaAperta.nativeElement.classList.add('opacity-0');
  }

  progressImgStatus = () => {
    this.imgStatus++;
    console.log(this.imgStatus)
    switch(this.imgStatus) {
      case(3):
        this.casaFadeOut();
        this.playBotti();
        setTimeout(() => {
          this.progressImgStatus();
        }, 2000);
      break;
      case(4):
        this.startPolpoAnimation();
      break;
    }
  }

  includesStatus = (statuses: number[]) => statuses.includes(this.imgStatus);
  
  startPolpoAnimation = () => {
    setInterval(() => {
      this.polpoIsOnLeft = !this.polpoIsOnLeft;
    }, 500)
  }

  killPolpo = () => {
    this.polpoIsAlive = false;
    this.stopBotti();
    const uhAudio = this.playAudio('UH.mp3');
    uhAudio.addEventListener('ended', () => {
      setTimeout(() => {
        this.aaaaIsVisible = true;
        this.playAudio('AAAA.mp3');
      });
    })
  }

  resurrectPolpo = () => {
    this.polpoIsAlive = true;
    this.polpoHasBeenResurrected = true;
    this.aaaaIsVisible = false;
    const resurrectionAudio = this.playAudio('Peiboru zeta.mp3');
    resurrectionAudio.addEventListener('ended', () => {
      this.playBotti();
    }, { once: true });
  }

  openNapoliLink = () => {
    window.open('https://www.youtube.com/watch?v=RIrc3B5IFsI&ab_channel=CesareGiordano', '_blank');
  }

  private playAudio = (fileName: string) => {
    let audio = new Audio('assets/audio/' + fileName);
    audio.play();
    return audio;
  }

  private stopAudio = (audio: HTMLAudioElement) => {
    if (!audio) { return; }
    audio.pause();
    audio.currentTime = 0;
  }

  private stopBotti = () => {
    this.stopAudio(this.audioBotti);
    clearTimeout(this.bottiTimeout);
    this.bottiPartiti = false;
  }

  private playBotti = () => {
    this.audioBotti = this.playAudio('botti.mp3');
    this.bottiTimeout = setTimeout(() => {
      this.bottiPartiti = true;
    }, 6700);
  }
}
