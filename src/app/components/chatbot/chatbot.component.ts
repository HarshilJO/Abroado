import { Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AnalyticsService } from '../../services/analytics.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent implements OnInit, OnDestroy {
  @ViewChild('robotHead', { static: true }) robotHead!: ElementRef<HTMLDivElement>;
  @ViewChild('pupilLeft', { static: true }) pupilLeft!: ElementRef<SVGCircleElement>;
  @ViewChild('pupilRight', { static: true }) pupilRight!: ElementRef<SVGCircleElement>;

  private rafId: number | null = null;
  private mouseX = 0;
  private mouseY = 0;
  private currentX = 0;
  private currentY = 0;
  private ease = 0.1;
  private boundMouseMove!: (e: MouseEvent) => void;

  private lastMouseX = 0;
  private lastMouseY = 0;
  private lastTime = 0;
  private speedBuffer: number[] = [];
  
  isDizzy = false;
  private dizzyTimeout: any;

  isOpen = false;
  isLoading = false;
  messages: { role: 'user' | 'assistant', content: any }[] = [];
  userInput = '';

  suggestedQuestions = [
    "What services do you offer?",
    "Do you guarantee visa approval?",
    "How can I contact you?",
    "Which countries do you specialize in?"
  ];

  constructor(private ngZone: NgZone, private analytics: AnalyticsService) {}

  ngOnInit() {
    this.boundMouseMove = this.onMouseMove.bind(this);
    
    // Run outside Angular zone to prevent excessive change detection
    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('mousemove', this.boundMouseMove);
      this.mouseX = window.innerWidth / 2;
      this.mouseY = window.innerHeight / 2;
      this.currentX = this.mouseX;
      this.currentY = this.mouseY;
      this.lastMouseX = this.mouseX;
      this.lastMouseY = this.mouseY;
      this.lastTime = Date.now();
      this.animate();
    });
  }

  ngOnDestroy() {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
    }
    window.removeEventListener('mousemove', this.boundMouseMove);
  }

  private onMouseMove(e: MouseEvent) {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;

    const now = Date.now();
    const dt = now - this.lastTime;
    
    // Only calculate speed if time has passed, to avoid Infinity
    if (dt > 10) {
      const dx = this.mouseX - this.lastMouseX;
      const dy = this.mouseY - this.lastMouseY;
      const speed = Math.sqrt(dx * dx + dy * dy) / dt;
      
      this.speedBuffer.push(speed);
      // Increase buffer size to 15 to require sustained vigorous movement over more frames
      if (this.speedBuffer.length > 15) {
        this.speedBuffer.shift();
      }
      
      const avgSpeed = this.speedBuffer.reduce((a, b) => a + b, 0) / this.speedBuffer.length;
      
      // If average speed over 15 recent frames exceeds a high threshold (10 px/ms), trigger dizzy dialog
      if (avgSpeed > 10 && this.speedBuffer.length === 15 && !this.isDizzy) {
        this.ngZone.run(() => {
          this.isDizzy = true;
          if (this.dizzyTimeout) clearTimeout(this.dizzyTimeout);
          this.dizzyTimeout = setTimeout(() => {
            this.isDizzy = false;
          }, 3000);
        });
      }
      
      this.lastMouseX = this.mouseX;
      this.lastMouseY = this.mouseY;
      this.lastTime = now;
    }
  }

  private animate() {
    this.currentX += (this.mouseX - this.currentX) * this.ease;
    this.currentY += (this.mouseY - this.currentY) * this.ease;

    const headEl = this.robotHead.nativeElement;
    const pLeft = this.pupilLeft.nativeElement;
    const pRight = this.pupilRight.nativeElement;

    if (headEl && pLeft && pRight) {
      const rect = headEl.getBoundingClientRect();
      const headCenterX = rect.left + rect.width / 2;
      const headCenterY = rect.top + rect.height / 2;

      // Calculate distance from center of head to mouse
      const deltaX = this.currentX - headCenterX;
      const deltaY = this.currentY - headCenterY;

      // Max rotation limits
      const maxRotateX = 15;
      const maxRotateY = 20;

      // Calculate rotation based on screen position
      const rotateY = (deltaX / window.innerWidth) * maxRotateY;
      const rotateX = -(deltaY / window.innerHeight) * maxRotateX;

      // Calculate subtle head translation
      const headMoveX = (deltaX / window.innerWidth) * 15;
      const headMoveY = (deltaY / window.innerHeight) * 15;

      // Apply head rotation and translation
      headEl.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translate(${headMoveX}px, ${headMoveY}px)`;

      // Pupil movement logic
      const pupilMaxMove = 4;
      
      // Calculate normalized direction vector (-1 to 1)
      let normX = deltaX / (window.innerWidth / 2);
      let normY = deltaY / (window.innerHeight / 2);
      
      // Clamp values
      normX = Math.max(-1, Math.min(1, normX));
      normY = Math.max(-1, Math.min(1, normY));

      const moveX = normX * pupilMaxMove;
      const moveY = normY * pupilMaxMove;

      pLeft.style.transform = `translate(${moveX}px, ${moveY}px)`;
      pRight.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }

    this.rafId = requestAnimationFrame(() => this.animate());
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
    if (this.isOpen && this.messages.length === 0) {
      this.messages.push({
        role: 'assistant',
        content: {
          text: 'Hi! I am the Abroado assistant. How can I help you today?',
          links: [],
          suggestions: []
        }
      });
    }
  }

  async sendMessage(content: string) {
    if (!content.trim()) return;

    this.analytics.trackChatbotLog(content);

    this.messages.push({ role: 'user', content });
    this.userInput = '';
    this.isLoading = true;

    try {
      const response = await fetch(environment.chatApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: this.messages
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const botResponseString = data.choices[0].message.content;
      
      let botResponse;
      try {
        botResponse = JSON.parse(botResponseString);
      } catch (e) {
        botResponse = {
          text: botResponseString,
          links: [],
          suggestions: []
        };
      }
      
      this.messages.push({ role: 'assistant', content: botResponse });
    } catch (error) {
      console.error('Error sending message:', error);
      this.messages.push({ role: 'assistant', content: { text: 'Sorry, I am having trouble connecting to the server.', links: [], suggestions: [] } });
    } finally {
      this.isLoading = false;
    }
  }
}
