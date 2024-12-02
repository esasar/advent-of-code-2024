#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>
#include <stdbool.h>

#define MAX_DIFF 3
#define FILENAME "input"
#define MAX_LEN 16
#define MAX_LINE 256

bool is_within_bounds(int *diffs, int len) {
    int i;

    for (i = 0; i < len; i++) {
        if (abs(diffs[i]) > MAX_DIFF || abs(diffs[i]) < 1) {
            return false;
        }
    }

    return true;
}

bool is_same_sign(int *diffs, int len) {
    int sign = diffs[0] > 0 ? 1 : -1;
    int i;

    for (i = 1; i < len; i++) {
        if (diffs[i] * sign < 0) {
            return false;
        }
    }

    return true;
}

bool is_safe(int *arr, int len) {
    int i;

    int diffs[MAX_LEN];

    for (i = 0; i < len - 1; i++) {
        diffs[i] = arr[i + 1] - arr[i];
    }

    return is_within_bounds(diffs, len - 1) && is_same_sign(diffs, len - 1);
}

bool is_safe_with_skip(int *arr, int len, int skip_idx) {
    int sub_arr[MAX_LEN];
    int i, j = 0;

    for (i = 0; i < len; i++) {
        if (i == skip_idx) {
            continue;
        }

        sub_arr[j++] = arr[i];
    }

    return is_safe(sub_arr, len - 1);
}

int line_to_int_array(char *line, int *arr) {
    int len = 0;
    char *token = strtok(line, " ");

    while (token != NULL) {
        arr[len++] = atoi(token);
        token = strtok(NULL, " ");
    }

    return len;
}

int main(void) {
    /** part 1 vars */
    FILE *file;
    char line[MAX_LINE];
    int arr[MAX_LEN];
    int count = 0;
    int i;

    /* part 2 vars */
    int count_damp = 0;

    file = fopen(FILENAME, "r");
    
    if (file == NULL) {
        printf("Error: could not open file %s\n", FILENAME);
        return EXIT_FAILURE;
    }

    while (fgets(line, sizeof(line), file)) {
        int len = line_to_int_array(line, arr);

        /** part 1 */
        if (is_safe(arr, len)) {
            count++;
        }

        /** part 2 */
        for (i = 0; i < len; i++) {
            if (is_safe_with_skip(arr, len, i)) {
                count_damp++;
                break;
            }
        }
    }

    fclose(file);

    printf("part 1 answer: %d\n", count);

    printf("part 2 answer: %d\n", count_damp);

    return EXIT_SUCCESS;
}
