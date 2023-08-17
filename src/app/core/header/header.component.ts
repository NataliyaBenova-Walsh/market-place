import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faCheck  } from '@fortawesome/free-solid-svg-icons';
import { faArrowRightFromBracket  } from '@fortawesome/free-solid-svg-icons';
import { } from '@fortawesome/free-regular-svg-icons'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
 

  constructor(public userService: UserService, library: FaIconLibrary) {
    library.addIcons(faCheck, faArrowRightFromBracket);
  }
  ngOnInit(): void {}

}
