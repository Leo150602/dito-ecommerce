import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../../index';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar{

  public cartService = inject(CartService);
  itemsGuardados = this.cartService.cantidadTotal;

  precioTotal = this.cartService.precioTotal;

}
