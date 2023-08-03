import { Component } from "@angular/core";
import { NgIf, NgFor } from "@angular/common";
import { Notification } from "src/app/core/model/notification.model";


@Component({
    selector: "app-corner-message-box",
    templateUrl: "./corner-message-box.component.html",
    styleUrls: ["./corner-message-box.component.css"],
    imports: [NgIf, NgFor],
    standalone: true
})
export class CornerMessageBoxComponent {
    public isVisable: boolean = false;
    public notifications: Notification[] = new Array<Notification>();
    public counter: number = 0;

    public showMessage(message: string, hideAfterMilliseconds: number = 5000) {
        const notification = new Notification(this.counter++, message)
        this.notifications.push(notification);
        this.isVisable = true;

        setTimeout(() => this.hideMessage(notification), hideAfterMilliseconds);
    }

    private hideMessage(notification: Notification) {
        const index: number = this.notifications.indexOf(notification);
        this.notifications.splice(index, 1);

        if (this.notifications.length === 0) {
            this.isVisable = false;
        }
    }
}
