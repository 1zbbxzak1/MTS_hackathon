import {Component} from '@angular/core';
import {ServicesManagerService} from '../../../../data/services/services.manager.service';

@Component({
    selector: 'app-search',
    standalone: false,

    templateUrl: './search.component.html',
    styleUrl: './styles/search.component.css'
})
export class SearchComponent {
    protected searchQuery: string = '';
    protected isDropdownVisible: boolean = false;
    protected filteredSuggestions: { name: string; type: string }[] = [];
    protected selectedSuggestions: { name: string; type: string }[] = [];
    protected isLoading: boolean = false;
    protected isTagLoading: boolean = false;
    protected searchResults: any[] = [];

    constructor(private servicesManager: ServicesManagerService) {
    }

    // Метод для фильтрации подсказок на основе введенного текста
    protected onSearchInput(): void {
        if (this.searchQuery.trim()) {
            this.servicesManager.searchFilters(this.searchQuery).subscribe({
                next: (results) => {
                    this.filteredSuggestions = results.map((result) => ({
                        name: result.value,
                        type: result.type
                    }));
                    this.isDropdownVisible = this.filteredSuggestions.length > 0;
                },
                error: (error) => {
                    console.error('Error fetching filter suggestions:', error);
                }
            });
        } else {
            this.filteredSuggestions = [];
            this.isDropdownVisible = false;
        }
    }

    // Method to handle a suggestion click and add it to the selected tags
    protected onSuggestionClick(suggestion: { name: string; type: string }): void {
        if (!this.selectedSuggestions.some((item) => item.name === suggestion.name)) {
            this.selectedSuggestions.push(suggestion);
            this.searchQuery = ''; // Clear the search input after selection
            this.filteredSuggestions = []; // Hide suggestions
            this.isDropdownVisible = false;
            this.onSearch(); // Trigger search with new selection
        }
    }

    // Method to create a new custom tag from the input and trigger a search
    protected onTagCreate(event: Event): void {
        const keyboardEvent: KeyboardEvent = event as KeyboardEvent;
        const isFirstTag: boolean = this.selectedSuggestions.length === 0;

        if (this.searchQuery.trim() && keyboardEvent.key === 'Enter') {
            const newTag: { name: string, type: string } = {name: this.searchQuery.trim(), type: 'custom'};

            if (!this.selectedSuggestions.some((item) => item.name === newTag.name)) {
                if (isFirstTag) {
                    this.isLoading = true;
                } else {
                    this.isTagLoading = true;
                }

                this.selectedSuggestions.push(newTag);
                this.searchQuery = ''; // Clear the search input
                this.filteredSuggestions = []; // Hide suggestions

                setTimeout(() => {
                    if (isFirstTag) {
                        this.isLoading = false;
                    } else {
                        this.isTagLoading = false;
                    }
                    this.onSearch(); // Trigger search with new tag
                }, 2000);
            }
        }
    }

    // Method to remove a selected tag and trigger a search
    protected onRemoveTag(index: number): void {
        const isLastTag: boolean = this.selectedSuggestions.length === 1;

        if (isLastTag) {
            this.isLoading = true;
        } else {
            this.isTagLoading = true;
        }

        const tagElement: Element = document.querySelectorAll('.tag')[index];

        if (tagElement) {
            tagElement.classList.add('tag-animate-out');
            setTimeout(() => {
                this.selectedSuggestions.splice(index, 1);

                if (isLastTag) {
                    this.isLoading = false;
                } else {
                    this.isTagLoading = false;
                }
                this.onSearch();
            }, 2000);
        }
    }

    // Method to trigger a search based on selected filters
    protected onSearch(): void {
        if (this.selectedSuggestions.length === 0) {
            this.searchResults = []; // Clear results if no filters are selected
            return;
        }

        this.isLoading = true;
        this.searchResults = []; // Clear previous results

        // Prepare filters from the selected tags
        const filters = this.selectedSuggestions.map((suggestion) => ({
            value: suggestion.name,
            type: suggestion.type
        }));

        // Call the service method with all selected filters
        this.servicesManager.searchByFilters(filters).subscribe({
            next: (results) => {
                this.isLoading = false;
                this.searchResults = results; // Update search results with the fetched data
            },
            error: (error) => {
                this.isLoading = false;
                console.error('Error fetching search results:', error);
            }
        });
    }
}
