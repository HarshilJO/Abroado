import { Injectable } from '@angular/core';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: 'visa-tips' | 'student-life' | 'destinations' | 'news' | 'success-stories';
  tags: string[];
  author: string;
  authorAvatar: string;
  date: string;
  coverImage: string;
  instagramUrl?: string;
  readTime: number;
  published: boolean;
}

const STORAGE_KEY = 'abroado_blog_posts';
const ADMIN_PIN = 'abroado2024';

const SAMPLE_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Complete Guide to UK Student Visa 2024',
    slug: 'complete-guide-uk-student-visa-2024',
    excerpt: 'Everything you need to know about applying for a UK Student Visa — from eligibility to approval. Our step-by-step guide covers CAS numbers, financial requirements, and more.',
    content: `## Introduction\n\nApplying for a UK Student Visa (Tier 4) can seem overwhelming, but with the right guidance, it's a straightforward process. This comprehensive guide walks you through every step.\n\n## Step 1: Receive Your CAS Number\n\nBefore applying, you need a Confirmation of Acceptance for Studies (CAS) from your university. This unique number is essential for your visa application.\n\n## Step 2: Financial Requirements\n\nYou must show sufficient funds to cover:\n- Course fees for the first year\n- Living costs: £1,334/month in London, £1,023/month elsewhere\n\n## Step 3: English Language Proficiency\n\nMost universities require IELTS Academic with a minimum band score of 6.0-7.0 depending on your course.\n\n## Step 4: Submit Your Application\n\nApply online through the UK Visas and Immigration website. You'll need to:\n1. Complete the online form\n2. Pay the application fee (£490)\n3. Pay the Immigration Health Surcharge\n4. Book a biometrics appointment\n\n## Step 5: After Submission\n\nTypically processed within 3 weeks. Priority processing available for an additional fee.\n\n## Tips for Success\n\n- Apply at least 3 months before your course starts\n- Ensure all documents are translated by a certified translator\n- Double-check your financial statements cover the required period\n\nContact Abroado today for personalised guidance through your UK visa journey!`,
    category: 'visa-tips',
    tags: ['UK', 'Student Visa', 'University', 'IELTS'],
    author: 'Abroado Team',
    authorAvatar: 'AT',
    date: '2024-01-15',
    coverImage: 'images/uk-hero.jpg',
    instagramUrl: 'https://www.instagram.com/abroado_edu/',
    readTime: 8,
    published: true
  },
  {
    id: '2',
    title: 'Top 10 Universities in Australia for International Students',
    slug: 'top-universities-australia-international-students',
    excerpt: 'Australia boasts some of the world\'s finest universities. We explore the top 10 institutions that welcome international students with open arms, excellent support, and world-class education.',
    content: `## Why Study in Australia?\n\nAustralia is home to 8 of the world's top 100 universities and offers exceptional quality of life, a multicultural environment, and excellent post-study work opportunities.\n\n## Top Universities\n\n### 1. Australian National University (ANU)\nRanked #1 in Australia, ANU excels in research and offers over 100 undergraduate programs.\n\n### 2. University of Melbourne\nConsistently ranked #1 for graduate employability. Known for its world-class research facilities.\n\n### 3. University of Sydney\nAustralia's first university, offering over 400 courses across 16 faculties.\n\n### 4. UNSW Sydney\nLeading in engineering, business, and law. Strong industry connections ensure excellent employment outcomes.\n\n### 5. University of Queensland (UQ)\nBeautiful St Lucia campus with exceptional research in biomedical sciences.\n\n## Post-Study Work Rights\n\nAfter graduating, you can apply for a Temporary Graduate visa (subclass 485) allowing you to work in Australia for 2-6 years depending on your qualification level.\n\nReady to apply? Contact Abroado for free university shortlisting assistance!`,
    category: 'destinations',
    tags: ['Australia', 'Universities', 'Study Abroad', 'Rankings'],
    author: 'Priya Sharma',
    authorAvatar: 'PS',
    date: '2024-01-08',
    coverImage: 'images/australia-hero.jpg',
    readTime: 6,
    published: true
  },
  {
    id: '3',
    title: 'Student Life in the UK: What to Expect',
    slug: 'student-life-uk-what-to-expect',
    excerpt: 'Moving to the UK for studies is an exciting adventure. From accommodation to social life, here\'s your insider guide to making the most of your time as an international student in Britain.',
    content: `## Welcome to the UK!\n\nLiving and studying in the UK is a transformative experience. Here's what to expect as an international student.\n\n## Accommodation Options\n\n### University Halls of Residence\nGreat for first-year students — safe, social, and usually centrally located. Costs range from £100-£250/week.\n\n### Private Accommodation\nMore freedom and often cheaper in groups. Join Facebook groups and SpareRoom to find listings.\n\n## Cost of Living\n\nBudget approximately:\n- Accommodation: £400-£700/month\n- Food: £150-£200/month\n- Transport: £50-£100/month\n- Entertainment: £50-£100/month\n\n## Work Rights\n\nAs a student, you can work up to 20 hours/week during term time and full-time during holidays.\n\n## Social Life\n\nUniversity societies (over 200 at most universities!) are the best way to make friends. From cricket clubs to debate societies, there's something for everyone.\n\n## Healthcare\n\nYou'll have full access to the NHS after paying the Immigration Health Surcharge with your visa.\n\nHave questions? Reach out to Abroado — we've helped 5000+ students make a smooth transition!`,
    category: 'student-life',
    tags: ['UK', 'Student Life', 'Accommodation', 'Tips'],
    author: 'Rahul Kumar',
    authorAvatar: 'RK',
    date: '2023-12-20',
    coverImage: 'images/students-hero.jpg',
    readTime: 7,
    published: true
  },
  {
    id: '4',
    title: 'Australia Visitor Visa: A Complete Family Guide',
    slug: 'australia-visitor-visa-family-guide',
    excerpt: 'Planning to visit family in Australia? Our comprehensive guide covers everything from application requirements to interview tips for the Australian Visitor Visa (subclass 600).',
    content: `## Australian Visitor Visa (Subclass 600)\n\nThe Visitor visa (subclass 600) allows you to visit Australia for tourism, to see family, or for short-term business purposes.\n\n## Who Can Apply?\n\nAnyone who wants to visit Australia can apply, but you must meet certain requirements:\n- Valid passport\n- Proof of sufficient funds\n- Genuine intention to visit temporarily\n- Good health and character\n\n## Application Process\n\n### Online Application\nApply through ImmiAccount on the Australian Department of Home Affairs website.\n\n### Required Documents\n- Valid passport (minimum 6 months validity)\n- Bank statements (last 6 months)\n- Proof of ties to home country (property, employment)\n- Invitation letter from host in Australia (for family visits)\n- Travel insurance\n\n## Processing Times\n\n- Standard: 15-20 business days\n- Priority: 5-7 business days\n\n## Our Success Rate\n\nAbroado has a 98% approval rate for Australian visitor visas. Our team reviews every document before submission to ensure completeness.\n\nContact us today for a free consultation!`,
    category: 'visa-tips',
    tags: ['Australia', 'Visitor Visa', 'Family', 'Tourism'],
    author: 'Abroado Team',
    authorAvatar: 'AT',
    date: '2023-12-10',
    coverImage: 'images/travel-hero.jpg',
    readTime: 5,
    published: true
  }
];

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  constructor() {
    this.initPosts();
  }

  private initPosts(): void {
    if (!localStorage.getItem(STORAGE_KEY)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_POSTS));
    }
  }

  getAllPosts(): BlogPost[] {
    const posts = localStorage.getItem(STORAGE_KEY);
    return posts ? JSON.parse(posts) : [];
  }

  getPublishedPosts(): BlogPost[] {
    return this.getAllPosts().filter(p => p.published).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  getPostBySlug(slug: string): BlogPost | undefined {
    return this.getAllPosts().find(p => p.slug === slug);
  }

  getPostById(id: string): BlogPost | undefined {
    return this.getAllPosts().find(p => p.id === id);
  }

  getRelatedPosts(post: BlogPost, limit = 3): BlogPost[] {
    return this.getPublishedPosts()
      .filter(p => p.id !== post.id && p.category === post.category)
      .slice(0, limit);
  }

  createPost(post: Omit<BlogPost, 'id'>): BlogPost {
    const posts = this.getAllPosts();
    const newPost: BlogPost = { ...post, id: Date.now().toString() };
    posts.push(newPost);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    return newPost;
  }

  updatePost(id: string, updates: Partial<BlogPost>): BlogPost | null {
    const posts = this.getAllPosts();
    const index = posts.findIndex(p => p.id === id);
    if (index === -1) return null;
    posts[index] = { ...posts[index], ...updates };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    return posts[index];
  }

  deletePost(id: string): boolean {
    const posts = this.getAllPosts();
    const filtered = posts.filter(p => p.id !== id);
    if (filtered.length === posts.length) return false;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  }

  togglePublish(id: string): BlogPost | null {
    const post = this.getPostById(id);
    if (!post) return null;
    return this.updatePost(id, { published: !post.published });
  }

  generateSlug(title: string): string {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }

  verifyPin(pin: string): boolean {
    return pin === ADMIN_PIN;
  }

  isAdminLoggedIn(): boolean {
    return sessionStorage.getItem('abroado_admin') === 'true';
  }

  adminLogin(pin: string): boolean {
    if (this.verifyPin(pin)) {
      sessionStorage.setItem('abroado_admin', 'true');
      return true;
    }
    return false;
  }

  adminLogout(): void {
    sessionStorage.removeItem('abroado_admin');
  }

  getStats() {
    const posts = this.getAllPosts();
    return {
      total: posts.length,
      published: posts.filter(p => p.published).length,
      drafts: posts.filter(p => !p.published).length,
    };
  }
}
