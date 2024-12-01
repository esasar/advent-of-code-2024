#include <stdio.h>
#include <stdlib.h>

#define NUMBERS 1000

typedef struct {
    int key;
    int value;
} Pair;

int partition(int *array, int low, int high) {
    int pivot = array[high];
    int i = low;
    int j = 0;
    int temp = 0;

    for (j = low; j < high; j++) {
        if (array[j] <= pivot) {
            temp = array[i];
            array[i] = array[j];
            array[j] = temp;
            i++;
        }
    }

    temp = array[i];
    array[i] = array[high];
    array[high] = temp;

    return i;
}

int quicksort(int *array, int low, int high) {
    int pivot = 0;

    if (low >= high || low < 0) {
        return 0;
    }

    pivot = partition(array, low, high);

    quicksort(array, low, pivot - 1);
    quicksort(array, pivot + 1, high);
}

int main(void) {
    // vars for part 1
    FILE *file;
    char filename[] = "input";
    int left[NUMBERS];
    int right[NUMBERS];
    int count = 0;
    int i = 0;
    int j = 0;
    int temp = 0;
    int sum = 0;

    // vars for part 2
    Pair pairs[NUMBERS];
    Pair pair = {0, 0};
    int number = 0;
    int sim_score = 0;

    // part 1 
    file = fopen(filename, "r");
    if (file == NULL) {
        printf("Error: Could not open file %s\n", filename);
        exit(1);
    }
    while (fscanf(file, "%d %d", &left[count], &right[count]) == 2) {
        count++;
        if (count >= NUMBERS) {
            break;
        }
    }
    fclose(file);

    quicksort(left, 0, NUMBERS - 1);

    quicksort(right, 0, NUMBERS - 1);

    for (i = 0; i < NUMBERS; i++) {
        sum += abs(left[i] - right[i]);
    }

    printf("part 1 answer: %d\n", sum);

    // part 2
    for (i = 0; i < NUMBERS; i++) {
        number = left[i];
        pair.key = number;
        pair.value = 0;
        for (j = 0; j < NUMBERS; j++) {
            if (left[i] == right[j]) {
                pair.value++;
            }
        }
        pairs[i] = pair;
    }

    for (i = 0; i < NUMBERS; i++) {
        temp = pairs[i].value * pairs[i].key;
        sim_score += temp;
    }

    printf("part 2 answer: %d\n", sim_score);

    return EXIT_SUCCESS;
}