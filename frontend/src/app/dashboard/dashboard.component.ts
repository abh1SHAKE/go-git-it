import { Component, ElementRef, ViewChild } from '@angular/core';
import { SnippetCardComponent } from '../shared/snippet-card/snippet-card.component';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FilterDialogComponent } from './filter-dialog/filter-dialog.component';
import { SearchTagDialogComponent } from './search-tag-dialog/search-tag-dialog.component';
import { SyntaxHighlighterComponent } from './syntax-highlighter/syntax-highlighter.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    FormsModule, 
    SnippetCardComponent, 
    SyntaxHighlighterComponent,
    FilterDialogComponent,
    SearchTagDialogComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  @ViewChild('codeContainer', { read: ElementRef }) codeContainer!: ElementRef;
  searchTerm: string = '';

  snippets = [
    {
      title: 'title1',
    },
    {
      title: 'title1',
    },
    {
      title: 'title1',
    },
    {
      title: 'title1',
    },
    {
      title: 'title1',
    },
    {
      title: 'title1',
    },
    {
      title: 'title1',
    },
  ];

  constructor(private dialog: MatDialog) {}

  onSearch(term: string) {
    const lowerTerm = term.toLowerCase();
    console.log(lowerTerm);
  }


  searchPopupVisible = false;
  filterPopupVisible = false;

openPopup(type: string) {
  if (type === 'search-tag') {
    this.searchPopupVisible = true;
    this.filterPopupVisible = false;
  } else if (type === 'filter-dialog') {
    this.filterPopupVisible = true;
    this.searchPopupVisible = false;
  }
}

  closePopup(type: string) {
    if (type === 'search-tag') {
      this.searchPopupVisible = false;
    } else if (type === 'filter-dialog') {
      this.filterPopupVisible = false;
    }
  }


  copyCode() {
    navigator.clipboard
      .writeText(this.selectedSnippet.code)
      .then(() => {
        console.log('Copied');
      })
      .catch((err) => {
        console.error('Failed to copy: ', err);
      });
  }

  selectedSnippet = {
    language: 'java',
    code: `import java.util.Scanner;

  public class BankingApp {
      private static double balance = 1000.0;

      public static void main(String[] args) {
          Scanner scanner = new Scanner(System.in);
          boolean exit = false;

          System.out.println("Welcome to the Banking App!");

          while (!exit) {
              System.out.println("\\nChoose an operation:");
              System.out.println("1. Check Balance");
              System.out.println("2. Deposit");
              System.out.println("3. Withdraw");
              System.out.println("4. Exit");

              System.out.print("Enter your choice: ");
              int choice = scanner.nextInt();

              switch (choice) {
                  case 1:
                      checkBalance();
                      break;
                  case 2:
                      System.out.print("Enter deposit amount: ");
                      double depositAmount = scanner.nextDouble();
                      deposit(depositAmount);
                      break;
                  case 3:
                      System.out.print("Enter withdrawal amount: ");
                      double withdrawAmount = scanner.nextDouble();
                      withdraw(withdrawAmount);
                      break;
                  case 4:
                      exit = true;
                      System.out.println("Thank you for using the Banking App.");
                      break;
                  default:
                      System.out.println("Invalid choice. Try again.");
              }
          }

          scanner.close();
      }

      private static void checkBalance() {
          System.out.printf("Your balance is: ₹%.2f\\n", balance);
      }

      private static void deposit(double amount) {
          if (amount > 0) {
              balance += amount;
              System.out.printf("₹%.2f deposited. New balance: ₹%.2f\\n", amount, balance);
          } else {
              System.out.println("Invalid deposit amount.");
          }
      }

      private static void withdraw(double amount) {
          if (amount > 0 && amount <= balance) {
              balance -= amount;
              System.out.printf("₹%.2f withdrawn. Remaining balance: ₹%.2f\\n", amount, balance);
          } else {
              System.out.println("Insufficient balance or invalid amount.");
          }
      }
  }`,
  };
}
