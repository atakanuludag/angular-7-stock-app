import { NgModule } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from '../../core/services/authentication.service';
import { ServerErrorDialogComponent } from '../layout/server-error-dialog/server-error-dialog.component';
@NgModule()

export class CoreHelpers {

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        public dialog: MatDialog
    ) { }

    public redirectPage(page: string) {
        this.router.navigate([page]);
    }

    public unauthorized() {
        this.authenticationService.logout();
        location.reload(true);
    }

    public serverErrorDialog(error: HttpErrorResponse) {
        let dialog = this.dialog.open(ServerErrorDialogComponent, {
            data: {
                error: error
            }
        });

        dialog.afterClosed()
            .subscribe(() => {
                location.reload(true);
            });
    }


}