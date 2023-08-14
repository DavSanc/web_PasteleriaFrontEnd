import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { FooterComponent } from './components/partials/footer/footer.component';
import { SwiperComponent } from './components/swiper/swiper.component';
import { AboutComponent } from './components/about/about.component';
import { MenuComponent } from './components/menu/menu.component';
import { SubscriptionComponent } from './components/subscription/subscription.component';
import { ReviewComponent } from './components/review/review.component';
import { SectionBrandComponent } from './components/section-brand/section-brand.component';
import { CartComponent } from './pages/cart/cart.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { StoreComponent } from './pages/store/store.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    SwiperComponent,
    AboutComponent,
    MenuComponent,
    SubscriptionComponent,
    ReviewComponent,
    SectionBrandComponent,
    CartComponent,
    AboutUsComponent,
    StoreComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
