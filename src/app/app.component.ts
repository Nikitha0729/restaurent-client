import { Component, OnInit } from '@angular/core';
import { DishService } from './dish.service';
import { Dish } from './dishes.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  dishes: Dish[] = [];
  newDish: Dish = {
    name: '',
    description: '',
    vegetarian: false,
    image: '',
    price: 0,
    ingredients: '',
    available: false,
    rating: 0,
  };
  selectedDish: Dish | null = null;
  showDishForm = false;

  constructor(private dishService: DishService) {
    this.getDishes();
  }

  ngOnInit(): void {
    this.getDishes();
  }

  showUpdateForm(dish: Dish): void {
    this.selectedDish = dish;
    this.showDishForm = true;
  }

  hideForm(): void {
    this.selectedDish = null;
    this.showDishForm = false;
  }

  getDishes(): void {
    this.dishService.getDishes().subscribe((dish) => (this.dishes = dish));
  }

  addDish(): void {
    this.dishService.addDish(this.newDish).subscribe(() => {
      this.getDishes();
      this.newDish = {
        name: '',
        description: '',
        vegetarian: false,
        image: '',
        price: 0,
        ingredients: '',
        available: false,
        rating: 0,
      };
    });
  }

  updateDish(dish: Dish) {
    if (dish._id) {
      this.dishService.updateDish(dish._id, dish).subscribe(
        (updatedDish) => {
          const index = this.dishes.findIndex((p) => p._id === updatedDish._id);
          if (index !== -1) {
            this.dishes[index] = updatedDish;
            this.selectedDish = null;
            this.showDishForm = false;
          }
        },
        (error) => {
          console.error('Error updating dish:', error);
        }
      );
    }
  }

  deleteDish(dishId: string | undefined): void {
    if (!dishId) return;
    this.dishService.deleteDish(dishId).subscribe(() => this.getDishes());
  }
}
