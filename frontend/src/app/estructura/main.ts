import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Header } from './header/header';
import { Nav } from './nav/nav';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterModule, Header, Nav],
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class Main {}