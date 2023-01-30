import { Component, Input } from '@angular/core';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { GymApiService } from '../services/gym.api.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent {
  @Input() gymId: string = '';

  public form = this.formBuilder.group({
    text: new FormControl('', {
      updateOn: 'blur'
    }),
  });

  constructor(
    private gymApiService: GymApiService,
    private formBuilder: FormBuilder) {
      this.form.setValue({text: ''});
    }

  sendComment() {
    let text = this.form.value.text;
    this.gymApiService.postComment(this.gymId, text)
      .subscribe()
  }
}
