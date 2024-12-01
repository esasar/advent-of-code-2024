#include <stdio.h>
#include <stdlib.h>

#define NUMBERS 1000

typedef struct {
    int key;
    int value;
} Pair;

int main(void) {
    FILE *file;
    char filename[] = "input";
    char line[256];
    int left[NUMBERS];
    int right[NUMBERS];
    int count = 0;
    int i = 0;
    int j = 0;
    int sum = 0;

    Pair pairs[NUMBERS];
    int number = 0;
    int sim_score = 0;
    int temp = 0;

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

    for (i = 0; i < NUMBERS; i++) {
        for (j = i + 1; j < NUMBERS; j++) {
            if (left[i] > left[j]) {
                int temp = left[i];
                left[i] = left[j];
                left[j] = temp;
            }
        }
    }

    for (i = 0; i < NUMBERS; i++) {
        for (j = i + 1; j < NUMBERS; j++) {
            if (right[i] > right[j]) {
                int temp = right[i];
                right[i] = right[j];
                right[j] = temp;
            }
        }
    }

    for (i = 0; i < NUMBERS; i++) {
        sum += abs(left[i] - right[i]);
    }

    printf("part 1 answer: %d\n", sum);

    for (i = 0; i < NUMBERS; i++) {
        number = left[i];
        Pair pair = {number, 0};
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