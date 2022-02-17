const input = `Before: [3, 0, 0, 1]
0 3 0 2
After:  [3, 0, 1, 1]

Before: [2, 0, 0, 2]
4 0 3 1
After:  [2, 1, 0, 2]

Before: [0, 1, 1, 1]
14 0 0 2
After:  [0, 1, 0, 1]

Before: [3, 0, 1, 1]
11 0 0 3
After:  [3, 0, 1, 1]

Before: [1, 2, 2, 0]
9 0 2 1
After:  [1, 0, 2, 0]

Before: [0, 2, 3, 3]
11 2 2 3
After:  [0, 2, 3, 1]

Before: [2, 0, 1, 2]
4 0 3 2
After:  [2, 0, 1, 2]

Before: [2, 0, 2, 2]
6 3 3 3
After:  [2, 0, 2, 0]

Before: [0, 1, 2, 2]
1 1 2 3
After:  [0, 1, 2, 0]

Before: [0, 3, 0, 0]
14 0 0 0
After:  [0, 3, 0, 0]

Before: [2, 2, 0, 2]
4 0 3 3
After:  [2, 2, 0, 1]

Before: [2, 3, 2, 1]
13 2 2 0
After:  [1, 3, 2, 1]

Before: [2, 1, 1, 2]
4 0 3 1
After:  [2, 1, 1, 2]

Before: [1, 2, 2, 1]
9 0 2 0
After:  [0, 2, 2, 1]

Before: [2, 2, 0, 2]
4 0 3 1
After:  [2, 1, 0, 2]

Before: [1, 0, 2, 3]
9 0 2 1
After:  [1, 0, 2, 3]

Before: [1, 1, 3, 2]
10 1 3 1
After:  [1, 0, 3, 2]

Before: [0, 2, 1, 3]
14 0 0 1
After:  [0, 0, 1, 3]

Before: [2, 1, 2, 1]
11 0 0 1
After:  [2, 1, 2, 1]

Before: [1, 1, 2, 2]
3 2 3 1
After:  [1, 2, 2, 2]

Before: [3, 0, 2, 3]
8 1 0 1
After:  [3, 0, 2, 3]

Before: [1, 3, 2, 2]
9 0 2 2
After:  [1, 3, 0, 2]

Before: [2, 0, 3, 2]
4 0 3 2
After:  [2, 0, 1, 2]

Before: [2, 1, 1, 2]
10 1 3 1
After:  [2, 0, 1, 2]

Before: [2, 1, 2, 3]
1 1 2 2
After:  [2, 1, 0, 3]

Before: [3, 1, 2, 1]
1 1 2 3
After:  [3, 1, 2, 0]

Before: [2, 2, 2, 3]
5 2 2 1
After:  [2, 2, 2, 3]

Before: [2, 0, 2, 2]
4 0 3 2
After:  [2, 0, 1, 2]

Before: [2, 3, 1, 1]
11 0 0 0
After:  [1, 3, 1, 1]

Before: [2, 3, 2, 2]
4 0 3 1
After:  [2, 1, 2, 2]

Before: [3, 1, 3, 0]
0 1 0 1
After:  [3, 1, 3, 0]

Before: [3, 1, 2, 3]
12 3 0 3
After:  [3, 1, 2, 1]

Before: [1, 0, 3, 1]
6 3 3 1
After:  [1, 0, 3, 1]

Before: [0, 1, 2, 3]
1 1 2 3
After:  [0, 1, 2, 0]

Before: [1, 2, 1, 3]
2 1 3 1
After:  [1, 0, 1, 3]

Before: [1, 2, 2, 3]
9 0 2 2
After:  [1, 2, 0, 3]

Before: [3, 3, 3, 2]
11 0 2 1
After:  [3, 1, 3, 2]

Before: [2, 1, 0, 2]
10 1 3 3
After:  [2, 1, 0, 0]

Before: [3, 3, 3, 3]
5 3 3 0
After:  [3, 3, 3, 3]

Before: [0, 3, 2, 0]
13 0 0 0
After:  [1, 3, 2, 0]

Before: [3, 0, 2, 2]
3 2 3 3
After:  [3, 0, 2, 2]

Before: [1, 3, 2, 1]
9 0 2 1
After:  [1, 0, 2, 1]

Before: [1, 1, 2, 3]
1 1 2 0
After:  [0, 1, 2, 3]

Before: [1, 1, 0, 2]
15 1 0 1
After:  [1, 1, 0, 2]

Before: [0, 1, 1, 3]
2 2 3 3
After:  [0, 1, 1, 0]

Before: [3, 1, 3, 3]
0 3 0 3
After:  [3, 1, 3, 3]

Before: [0, 0, 3, 3]
14 0 0 3
After:  [0, 0, 3, 0]

Before: [2, 1, 2, 2]
1 1 2 2
After:  [2, 1, 0, 2]

Before: [2, 1, 0, 2]
4 0 3 0
After:  [1, 1, 0, 2]

Before: [2, 1, 2, 1]
7 3 2 0
After:  [1, 1, 2, 1]

Before: [3, 1, 2, 2]
10 1 3 2
After:  [3, 1, 0, 2]

Before: [3, 1, 1, 3]
0 1 0 2
After:  [3, 1, 1, 3]

Before: [3, 0, 2, 1]
7 3 2 0
After:  [1, 0, 2, 1]

Before: [2, 2, 0, 2]
4 0 3 0
After:  [1, 2, 0, 2]

Before: [0, 3, 3, 3]
13 3 3 0
After:  [1, 3, 3, 3]

Before: [2, 1, 2, 3]
5 3 3 3
After:  [2, 1, 2, 3]

Before: [1, 1, 2, 1]
7 3 2 0
After:  [1, 1, 2, 1]

Before: [3, 0, 1, 3]
2 2 3 2
After:  [3, 0, 0, 3]

Before: [0, 2, 2, 1]
14 0 0 2
After:  [0, 2, 0, 1]

Before: [0, 3, 3, 1]
14 0 0 2
After:  [0, 3, 0, 1]

Before: [0, 1, 2, 2]
3 2 3 0
After:  [2, 1, 2, 2]

Before: [0, 3, 2, 0]
14 0 0 1
After:  [0, 0, 2, 0]

Before: [0, 1, 2, 2]
10 1 3 0
After:  [0, 1, 2, 2]

Before: [1, 3, 2, 1]
7 3 2 1
After:  [1, 1, 2, 1]

Before: [1, 0, 2, 3]
9 0 2 3
After:  [1, 0, 2, 0]

Before: [0, 3, 2, 2]
6 3 3 0
After:  [0, 3, 2, 2]

Before: [0, 0, 0, 3]
13 3 3 0
After:  [1, 0, 0, 3]

Before: [2, 0, 2, 2]
3 2 3 0
After:  [2, 0, 2, 2]

Before: [0, 0, 2, 2]
3 2 3 3
After:  [0, 0, 2, 2]

Before: [2, 2, 2, 1]
7 3 2 0
After:  [1, 2, 2, 1]

Before: [3, 3, 1, 3]
0 3 0 2
After:  [3, 3, 3, 3]

Before: [1, 1, 1, 1]
15 1 0 3
After:  [1, 1, 1, 1]

Before: [1, 2, 2, 0]
9 0 2 3
After:  [1, 2, 2, 0]

Before: [2, 2, 2, 1]
12 2 0 2
After:  [2, 2, 1, 1]

Before: [2, 1, 2, 2]
1 1 2 0
After:  [0, 1, 2, 2]

Before: [1, 0, 2, 2]
5 2 2 2
After:  [1, 0, 2, 2]

Before: [0, 0, 2, 2]
3 2 3 1
After:  [0, 2, 2, 2]

Before: [0, 1, 0, 2]
10 1 3 1
After:  [0, 0, 0, 2]

Before: [3, 1, 1, 3]
2 2 3 1
After:  [3, 0, 1, 3]

Before: [0, 2, 1, 0]
8 0 1 3
After:  [0, 2, 1, 0]

Before: [1, 1, 3, 3]
2 1 3 0
After:  [0, 1, 3, 3]

Before: [0, 0, 2, 2]
14 0 0 0
After:  [0, 0, 2, 2]

Before: [1, 2, 2, 3]
9 0 2 3
After:  [1, 2, 2, 0]

Before: [2, 2, 1, 3]
5 3 3 1
After:  [2, 3, 1, 3]

Before: [2, 2, 2, 2]
4 0 3 0
After:  [1, 2, 2, 2]

Before: [0, 0, 3, 0]
14 0 0 3
After:  [0, 0, 3, 0]

Before: [3, 2, 2, 0]
12 2 1 1
After:  [3, 1, 2, 0]

Before: [2, 1, 1, 2]
4 0 3 2
After:  [2, 1, 1, 2]

Before: [3, 2, 2, 3]
5 3 3 3
After:  [3, 2, 2, 3]

Before: [3, 2, 2, 2]
3 2 3 0
After:  [2, 2, 2, 2]

Before: [0, 0, 0, 1]
6 3 3 0
After:  [0, 0, 0, 1]

Before: [1, 1, 0, 0]
15 1 0 1
After:  [1, 1, 0, 0]

Before: [0, 0, 1, 1]
14 0 0 2
After:  [0, 0, 0, 1]

Before: [1, 3, 0, 3]
13 3 3 1
After:  [1, 1, 0, 3]

Before: [1, 1, 3, 1]
15 1 0 3
After:  [1, 1, 3, 1]

Before: [1, 1, 2, 1]
5 2 2 2
After:  [1, 1, 2, 1]

Before: [3, 2, 2, 1]
7 3 2 1
After:  [3, 1, 2, 1]

Before: [1, 1, 2, 0]
15 1 0 2
After:  [1, 1, 1, 0]

Before: [0, 0, 3, 0]
11 2 2 0
After:  [1, 0, 3, 0]

Before: [0, 2, 2, 3]
12 2 1 2
After:  [0, 2, 1, 3]

Before: [0, 0, 3, 2]
14 0 0 3
After:  [0, 0, 3, 0]

Before: [1, 3, 2, 3]
13 2 2 2
After:  [1, 3, 1, 3]

Before: [1, 1, 2, 1]
7 3 2 3
After:  [1, 1, 2, 1]

Before: [0, 1, 3, 0]
8 0 1 1
After:  [0, 0, 3, 0]

Before: [1, 0, 2, 2]
9 0 2 0
After:  [0, 0, 2, 2]

Before: [0, 1, 0, 3]
8 0 1 3
After:  [0, 1, 0, 0]

Before: [0, 2, 1, 3]
2 1 3 3
After:  [0, 2, 1, 0]

Before: [2, 3, 2, 3]
11 0 0 0
After:  [1, 3, 2, 3]

Before: [0, 0, 2, 1]
6 3 3 3
After:  [0, 0, 2, 0]

Before: [2, 2, 3, 2]
11 0 0 0
After:  [1, 2, 3, 2]

Before: [3, 1, 2, 1]
7 3 2 1
After:  [3, 1, 2, 1]

Before: [0, 2, 2, 1]
7 3 2 1
After:  [0, 1, 2, 1]

Before: [0, 1, 0, 3]
14 0 0 1
After:  [0, 0, 0, 3]

Before: [1, 1, 2, 1]
9 0 2 3
After:  [1, 1, 2, 0]

Before: [0, 3, 3, 3]
8 0 1 3
After:  [0, 3, 3, 0]

Before: [0, 3, 0, 3]
13 3 3 3
After:  [0, 3, 0, 1]

Before: [0, 2, 2, 3]
8 0 3 0
After:  [0, 2, 2, 3]

Before: [2, 3, 2, 1]
12 2 0 0
After:  [1, 3, 2, 1]

Before: [0, 3, 3, 0]
8 0 1 0
After:  [0, 3, 3, 0]

Before: [1, 1, 1, 2]
10 1 3 3
After:  [1, 1, 1, 0]

Before: [0, 3, 1, 1]
8 0 3 0
After:  [0, 3, 1, 1]

Before: [2, 1, 3, 3]
2 1 3 0
After:  [0, 1, 3, 3]

Before: [1, 1, 2, 3]
1 1 2 2
After:  [1, 1, 0, 3]

Before: [3, 3, 2, 3]
2 2 3 3
After:  [3, 3, 2, 0]

Before: [0, 1, 1, 3]
13 3 2 0
After:  [0, 1, 1, 3]

Before: [0, 2, 0, 2]
13 0 0 1
After:  [0, 1, 0, 2]

Before: [3, 1, 2, 3]
1 1 2 0
After:  [0, 1, 2, 3]

Before: [0, 3, 3, 3]
11 2 2 1
After:  [0, 1, 3, 3]

Before: [0, 2, 3, 2]
8 0 2 3
After:  [0, 2, 3, 0]

Before: [3, 1, 1, 0]
0 1 0 0
After:  [1, 1, 1, 0]

Before: [2, 1, 2, 1]
0 2 0 3
After:  [2, 1, 2, 2]

Before: [0, 1, 2, 3]
13 3 3 1
After:  [0, 1, 2, 3]

Before: [1, 0, 2, 0]
9 0 2 3
After:  [1, 0, 2, 0]

Before: [3, 1, 2, 0]
11 0 0 0
After:  [1, 1, 2, 0]

Before: [0, 2, 1, 0]
14 0 0 1
After:  [0, 0, 1, 0]

Before: [2, 1, 3, 2]
4 0 3 3
After:  [2, 1, 3, 1]

Before: [0, 2, 2, 3]
2 1 3 0
After:  [0, 2, 2, 3]

Before: [2, 3, 3, 1]
11 2 2 1
After:  [2, 1, 3, 1]

Before: [0, 2, 2, 1]
12 2 1 2
After:  [0, 2, 1, 1]

Before: [2, 3, 2, 2]
3 2 3 2
After:  [2, 3, 2, 2]

Before: [2, 3, 3, 2]
4 0 3 0
After:  [1, 3, 3, 2]

Before: [3, 1, 3, 3]
0 3 0 0
After:  [3, 1, 3, 3]

Before: [0, 2, 1, 3]
8 0 3 2
After:  [0, 2, 0, 3]

Before: [2, 1, 2, 2]
3 2 3 3
After:  [2, 1, 2, 2]

Before: [2, 2, 2, 2]
12 2 1 1
After:  [2, 1, 2, 2]

Before: [2, 1, 2, 2]
3 2 3 1
After:  [2, 2, 2, 2]

Before: [3, 0, 3, 3]
0 3 0 2
After:  [3, 0, 3, 3]

Before: [1, 0, 3, 0]
11 2 2 3
After:  [1, 0, 3, 1]

Before: [0, 2, 2, 0]
12 2 1 1
After:  [0, 1, 2, 0]

Before: [1, 1, 0, 0]
15 1 0 2
After:  [1, 1, 1, 0]

Before: [2, 1, 0, 2]
4 0 3 1
After:  [2, 1, 0, 2]

Before: [1, 2, 2, 3]
2 2 3 2
After:  [1, 2, 0, 3]

Before: [3, 1, 2, 3]
2 1 3 1
After:  [3, 0, 2, 3]

Before: [1, 1, 1, 3]
15 1 0 2
After:  [1, 1, 1, 3]

Before: [1, 2, 3, 0]
11 2 2 3
After:  [1, 2, 3, 1]

Before: [1, 1, 0, 2]
15 1 0 2
After:  [1, 1, 1, 2]

Before: [3, 1, 3, 2]
10 1 3 3
After:  [3, 1, 3, 0]

Before: [1, 1, 2, 2]
3 2 3 0
After:  [2, 1, 2, 2]

Before: [2, 1, 2, 1]
1 1 2 1
After:  [2, 0, 2, 1]

Before: [3, 1, 3, 1]
0 1 0 2
After:  [3, 1, 1, 1]

Before: [3, 1, 1, 2]
0 1 0 2
After:  [3, 1, 1, 2]

Before: [1, 3, 3, 1]
12 2 3 2
After:  [1, 3, 0, 1]

Before: [3, 1, 1, 2]
10 1 3 3
After:  [3, 1, 1, 0]

Before: [1, 1, 1, 2]
10 1 3 0
After:  [0, 1, 1, 2]

Before: [0, 1, 0, 2]
8 0 3 3
After:  [0, 1, 0, 0]

Before: [3, 0, 0, 3]
5 3 3 1
After:  [3, 3, 0, 3]

Before: [1, 1, 2, 2]
1 1 2 1
After:  [1, 0, 2, 2]

Before: [0, 0, 1, 1]
6 3 3 3
After:  [0, 0, 1, 0]

Before: [1, 2, 2, 2]
6 3 3 3
After:  [1, 2, 2, 0]

Before: [2, 3, 2, 1]
7 3 2 3
After:  [2, 3, 2, 1]

Before: [3, 3, 1, 1]
11 0 0 0
After:  [1, 3, 1, 1]

Before: [3, 0, 2, 1]
7 3 2 2
After:  [3, 0, 1, 1]

Before: [2, 0, 3, 2]
4 0 3 1
After:  [2, 1, 3, 2]

Before: [2, 3, 2, 1]
5 2 2 1
After:  [2, 2, 2, 1]

Before: [1, 1, 0, 2]
10 1 3 3
After:  [1, 1, 0, 0]

Before: [0, 3, 1, 3]
8 0 2 1
After:  [0, 0, 1, 3]

Before: [2, 0, 1, 2]
4 0 3 1
After:  [2, 1, 1, 2]

Before: [1, 3, 3, 3]
5 3 3 0
After:  [3, 3, 3, 3]

Before: [2, 2, 2, 2]
4 0 3 3
After:  [2, 2, 2, 1]

Before: [3, 1, 2, 0]
1 1 2 1
After:  [3, 0, 2, 0]

Before: [1, 3, 3, 1]
6 3 3 3
After:  [1, 3, 3, 0]

Before: [1, 1, 3, 1]
15 1 0 2
After:  [1, 1, 1, 1]

Before: [1, 1, 1, 1]
15 1 0 1
After:  [1, 1, 1, 1]

Before: [1, 3, 2, 3]
5 3 3 0
After:  [3, 3, 2, 3]

Before: [2, 0, 2, 1]
7 3 2 2
After:  [2, 0, 1, 1]

Before: [0, 1, 1, 2]
10 1 3 2
After:  [0, 1, 0, 2]

Before: [0, 2, 1, 3]
2 2 3 2
After:  [0, 2, 0, 3]

Before: [1, 1, 2, 0]
1 1 2 2
After:  [1, 1, 0, 0]

Before: [1, 0, 1, 3]
2 2 3 2
After:  [1, 0, 0, 3]

Before: [3, 1, 0, 3]
0 3 0 3
After:  [3, 1, 0, 3]

Before: [0, 2, 0, 1]
8 0 3 0
After:  [0, 2, 0, 1]

Before: [3, 1, 1, 0]
11 0 0 1
After:  [3, 1, 1, 0]

Before: [1, 2, 2, 2]
6 3 3 1
After:  [1, 0, 2, 2]

Before: [1, 2, 1, 3]
2 2 3 3
After:  [1, 2, 1, 0]

Before: [0, 3, 3, 2]
14 0 0 1
After:  [0, 0, 3, 2]

Before: [2, 2, 2, 1]
7 3 2 2
After:  [2, 2, 1, 1]

Before: [2, 2, 0, 2]
4 0 3 2
After:  [2, 2, 1, 2]

Before: [0, 1, 1, 3]
8 0 2 1
After:  [0, 0, 1, 3]

Before: [2, 1, 1, 2]
10 1 3 3
After:  [2, 1, 1, 0]

Before: [3, 0, 2, 3]
13 3 2 1
After:  [3, 0, 2, 3]

Before: [0, 3, 2, 1]
14 0 0 3
After:  [0, 3, 2, 0]

Before: [2, 3, 2, 1]
5 2 2 0
After:  [2, 3, 2, 1]

Before: [2, 1, 2, 3]
2 2 3 0
After:  [0, 1, 2, 3]

Before: [0, 1, 3, 2]
10 1 3 1
After:  [0, 0, 3, 2]

Before: [1, 1, 2, 0]
9 0 2 2
After:  [1, 1, 0, 0]

Before: [0, 3, 0, 3]
14 0 0 0
After:  [0, 3, 0, 3]

Before: [0, 2, 0, 3]
2 1 3 0
After:  [0, 2, 0, 3]

Before: [0, 0, 2, 1]
13 2 2 3
After:  [0, 0, 2, 1]

Before: [0, 1, 2, 2]
1 1 2 2
After:  [0, 1, 0, 2]

Before: [3, 1, 3, 3]
2 1 3 3
After:  [3, 1, 3, 0]

Before: [0, 3, 2, 0]
5 2 2 0
After:  [2, 3, 2, 0]

Before: [1, 2, 2, 1]
9 0 2 1
After:  [1, 0, 2, 1]

Before: [1, 3, 2, 3]
2 2 3 3
After:  [1, 3, 2, 0]

Before: [2, 3, 0, 2]
4 0 3 3
After:  [2, 3, 0, 1]

Before: [2, 2, 3, 1]
12 2 3 0
After:  [0, 2, 3, 1]

Before: [0, 1, 2, 2]
13 0 0 1
After:  [0, 1, 2, 2]

Before: [1, 0, 2, 1]
7 3 2 2
After:  [1, 0, 1, 1]

Before: [0, 3, 3, 0]
14 0 0 2
After:  [0, 3, 0, 0]

Before: [3, 0, 3, 1]
11 0 2 0
After:  [1, 0, 3, 1]

Before: [1, 2, 0, 1]
6 3 3 0
After:  [0, 2, 0, 1]

Before: [2, 1, 2, 1]
1 1 2 0
After:  [0, 1, 2, 1]

Before: [3, 3, 2, 3]
0 3 0 0
After:  [3, 3, 2, 3]

Before: [0, 3, 2, 3]
5 3 3 0
After:  [3, 3, 2, 3]

Before: [0, 1, 3, 3]
14 0 0 3
After:  [0, 1, 3, 0]

Before: [0, 0, 3, 1]
13 0 0 1
After:  [0, 1, 3, 1]

Before: [0, 3, 2, 2]
3 2 3 2
After:  [0, 3, 2, 2]

Before: [2, 2, 2, 3]
2 1 3 0
After:  [0, 2, 2, 3]

Before: [2, 2, 2, 3]
12 2 1 0
After:  [1, 2, 2, 3]

Before: [0, 0, 1, 0]
14 0 0 3
After:  [0, 0, 1, 0]

Before: [1, 1, 1, 2]
15 1 0 0
After:  [1, 1, 1, 2]

Before: [2, 0, 2, 1]
7 3 2 0
After:  [1, 0, 2, 1]

Before: [3, 0, 2, 1]
11 0 0 3
After:  [3, 0, 2, 1]

Before: [3, 1, 2, 2]
10 1 3 3
After:  [3, 1, 2, 0]

Before: [0, 1, 2, 3]
13 3 1 0
After:  [0, 1, 2, 3]

Before: [0, 1, 0, 3]
14 0 0 3
After:  [0, 1, 0, 0]

Before: [0, 3, 2, 3]
8 0 2 3
After:  [0, 3, 2, 0]

Before: [1, 3, 2, 2]
9 0 2 0
After:  [0, 3, 2, 2]

Before: [1, 0, 2, 1]
9 0 2 1
After:  [1, 0, 2, 1]

Before: [0, 1, 0, 3]
2 1 3 1
After:  [0, 0, 0, 3]

Before: [0, 0, 2, 3]
14 0 0 0
After:  [0, 0, 2, 3]

Before: [2, 2, 2, 1]
12 2 1 0
After:  [1, 2, 2, 1]

Before: [3, 3, 3, 1]
0 3 0 3
After:  [3, 3, 3, 1]

Before: [3, 3, 0, 1]
0 3 0 1
After:  [3, 1, 0, 1]

Before: [0, 1, 2, 3]
1 1 2 0
After:  [0, 1, 2, 3]

Before: [3, 3, 3, 3]
0 3 0 3
After:  [3, 3, 3, 3]

Before: [1, 0, 2, 2]
3 2 3 1
After:  [1, 2, 2, 2]

Before: [1, 2, 2, 2]
12 2 1 3
After:  [1, 2, 2, 1]

Before: [0, 1, 1, 2]
10 1 3 1
After:  [0, 0, 1, 2]

Before: [1, 0, 2, 2]
9 0 2 2
After:  [1, 0, 0, 2]

Before: [1, 1, 2, 2]
10 1 3 1
After:  [1, 0, 2, 2]

Before: [3, 3, 1, 1]
0 3 0 1
After:  [3, 1, 1, 1]

Before: [2, 1, 2, 2]
12 2 0 0
After:  [1, 1, 2, 2]

Before: [2, 0, 3, 2]
4 0 3 0
After:  [1, 0, 3, 2]

Before: [2, 2, 3, 2]
4 0 3 3
After:  [2, 2, 3, 1]

Before: [2, 3, 3, 3]
13 3 3 2
After:  [2, 3, 1, 3]

Before: [3, 3, 2, 1]
7 3 2 1
After:  [3, 1, 2, 1]

Before: [0, 3, 2, 0]
8 0 2 2
After:  [0, 3, 0, 0]

Before: [0, 1, 3, 2]
13 2 1 1
After:  [0, 0, 3, 2]

Before: [0, 1, 2, 2]
13 0 0 0
After:  [1, 1, 2, 2]

Before: [2, 2, 1, 3]
2 1 3 0
After:  [0, 2, 1, 3]

Before: [1, 1, 1, 0]
15 1 0 1
After:  [1, 1, 1, 0]

Before: [2, 2, 2, 2]
3 2 3 2
After:  [2, 2, 2, 2]

Before: [1, 1, 2, 3]
15 1 0 3
After:  [1, 1, 2, 1]

Before: [2, 0, 3, 2]
4 0 3 3
After:  [2, 0, 3, 1]

Before: [3, 0, 3, 3]
0 3 0 3
After:  [3, 0, 3, 3]

Before: [0, 2, 1, 1]
8 0 2 1
After:  [0, 0, 1, 1]

Before: [1, 3, 2, 0]
5 2 2 3
After:  [1, 3, 2, 2]

Before: [0, 2, 2, 1]
6 3 3 1
After:  [0, 0, 2, 1]

Before: [1, 1, 3, 0]
15 1 0 1
After:  [1, 1, 3, 0]

Before: [2, 0, 1, 3]
5 3 3 0
After:  [3, 0, 1, 3]

Before: [1, 1, 2, 1]
15 1 0 1
After:  [1, 1, 2, 1]

Before: [2, 1, 2, 2]
3 2 3 0
After:  [2, 1, 2, 2]

Before: [1, 1, 3, 2]
15 1 0 3
After:  [1, 1, 3, 1]

Before: [0, 2, 1, 1]
14 0 0 0
After:  [0, 2, 1, 1]

Before: [0, 0, 2, 0]
5 2 2 1
After:  [0, 2, 2, 0]

Before: [0, 1, 2, 3]
2 1 3 2
After:  [0, 1, 0, 3]

Before: [3, 1, 2, 2]
3 2 3 0
After:  [2, 1, 2, 2]

Before: [1, 2, 2, 2]
9 0 2 2
After:  [1, 2, 0, 2]

Before: [2, 2, 2, 1]
5 2 2 1
After:  [2, 2, 2, 1]

Before: [1, 1, 2, 1]
7 3 2 1
After:  [1, 1, 2, 1]

Before: [3, 0, 0, 1]
0 3 0 3
After:  [3, 0, 0, 1]

Before: [3, 2, 3, 3]
12 3 0 3
After:  [3, 2, 3, 1]

Before: [3, 1, 2, 2]
10 1 3 1
After:  [3, 0, 2, 2]

Before: [1, 0, 1, 3]
13 3 2 1
After:  [1, 0, 1, 3]

Before: [0, 0, 0, 2]
14 0 0 1
After:  [0, 0, 0, 2]

Before: [3, 0, 3, 1]
0 3 0 1
After:  [3, 1, 3, 1]

Before: [1, 1, 2, 3]
1 1 2 3
After:  [1, 1, 2, 0]

Before: [3, 1, 2, 1]
1 1 2 1
After:  [3, 0, 2, 1]

Before: [3, 3, 0, 3]
13 3 3 2
After:  [3, 3, 1, 3]

Before: [3, 3, 2, 3]
2 2 3 2
After:  [3, 3, 0, 3]

Before: [1, 2, 2, 1]
9 0 2 2
After:  [1, 2, 0, 1]

Before: [3, 1, 0, 1]
0 3 0 1
After:  [3, 1, 0, 1]

Before: [2, 2, 3, 2]
4 0 3 0
After:  [1, 2, 3, 2]

Before: [2, 0, 2, 1]
7 3 2 1
After:  [2, 1, 2, 1]

Before: [1, 1, 2, 2]
9 0 2 2
After:  [1, 1, 0, 2]

Before: [0, 1, 3, 2]
6 3 3 2
After:  [0, 1, 0, 2]

Before: [3, 3, 0, 2]
6 3 3 3
After:  [3, 3, 0, 0]

Before: [3, 1, 3, 1]
11 0 2 2
After:  [3, 1, 1, 1]

Before: [0, 1, 2, 1]
7 3 2 3
After:  [0, 1, 2, 1]

Before: [1, 2, 2, 1]
7 3 2 1
After:  [1, 1, 2, 1]

Before: [3, 1, 0, 2]
10 1 3 2
After:  [3, 1, 0, 2]

Before: [0, 1, 3, 2]
14 0 0 2
After:  [0, 1, 0, 2]

Before: [0, 3, 0, 2]
14 0 0 1
After:  [0, 0, 0, 2]

Before: [0, 1, 2, 1]
1 1 2 3
After:  [0, 1, 2, 0]

Before: [1, 1, 2, 1]
9 0 2 1
After:  [1, 0, 2, 1]

Before: [0, 1, 2, 2]
10 1 3 2
After:  [0, 1, 0, 2]

Before: [1, 0, 2, 2]
3 2 3 2
After:  [1, 0, 2, 2]

Before: [2, 3, 3, 1]
12 2 3 3
After:  [2, 3, 3, 0]

Before: [2, 0, 3, 1]
12 2 3 0
After:  [0, 0, 3, 1]

Before: [2, 1, 2, 1]
7 3 2 2
After:  [2, 1, 1, 1]

Before: [3, 3, 2, 2]
3 2 3 0
After:  [2, 3, 2, 2]

Before: [0, 1, 0, 1]
8 0 1 1
After:  [0, 0, 0, 1]

Before: [1, 1, 2, 1]
6 3 3 2
After:  [1, 1, 0, 1]

Before: [0, 1, 2, 2]
1 1 2 0
After:  [0, 1, 2, 2]

Before: [3, 3, 1, 3]
2 2 3 2
After:  [3, 3, 0, 3]

Before: [3, 2, 1, 3]
5 3 3 1
After:  [3, 3, 1, 3]

Before: [2, 1, 2, 2]
4 0 3 0
After:  [1, 1, 2, 2]

Before: [3, 3, 2, 2]
13 2 2 2
After:  [3, 3, 1, 2]

Before: [2, 1, 3, 2]
4 0 3 2
After:  [2, 1, 1, 2]

Before: [3, 0, 2, 2]
3 2 3 1
After:  [3, 2, 2, 2]

Before: [2, 0, 1, 2]
4 0 3 3
After:  [2, 0, 1, 1]

Before: [3, 2, 2, 0]
5 2 2 3
After:  [3, 2, 2, 2]

Before: [0, 0, 3, 3]
5 3 3 3
After:  [0, 0, 3, 3]

Before: [0, 1, 0, 3]
13 3 1 0
After:  [0, 1, 0, 3]

Before: [2, 2, 3, 2]
4 0 3 2
After:  [2, 2, 1, 2]

Before: [0, 3, 0, 1]
14 0 0 2
After:  [0, 3, 0, 1]

Before: [3, 3, 3, 0]
11 0 0 2
After:  [3, 3, 1, 0]

Before: [0, 3, 3, 3]
14 0 0 1
After:  [0, 0, 3, 3]

Before: [2, 2, 1, 1]
6 3 3 2
After:  [2, 2, 0, 1]

Before: [3, 2, 0, 3]
5 3 3 0
After:  [3, 2, 0, 3]

Before: [2, 2, 2, 3]
2 1 3 1
After:  [2, 0, 2, 3]

Before: [2, 3, 2, 2]
3 2 3 1
After:  [2, 2, 2, 2]

Before: [0, 1, 2, 1]
7 3 2 1
After:  [0, 1, 2, 1]

Before: [0, 1, 2, 2]
3 2 3 1
After:  [0, 2, 2, 2]

Before: [3, 1, 2, 0]
0 1 0 2
After:  [3, 1, 1, 0]

Before: [2, 2, 2, 0]
0 2 0 1
After:  [2, 2, 2, 0]

Before: [1, 1, 3, 0]
15 1 0 0
After:  [1, 1, 3, 0]

Before: [0, 3, 0, 3]
5 3 3 0
After:  [3, 3, 0, 3]

Before: [3, 3, 3, 3]
0 3 0 0
After:  [3, 3, 3, 3]

Before: [3, 0, 2, 0]
5 2 2 2
After:  [3, 0, 2, 0]

Before: [2, 3, 2, 2]
6 3 3 0
After:  [0, 3, 2, 2]

Before: [1, 0, 2, 3]
9 0 2 0
After:  [0, 0, 2, 3]

Before: [2, 3, 2, 0]
5 2 2 1
After:  [2, 2, 2, 0]

Before: [3, 3, 3, 1]
12 2 3 3
After:  [3, 3, 3, 0]

Before: [1, 1, 1, 3]
2 2 3 2
After:  [1, 1, 0, 3]

Before: [3, 1, 1, 2]
11 0 0 2
After:  [3, 1, 1, 2]

Before: [1, 1, 0, 2]
15 1 0 3
After:  [1, 1, 0, 1]

Before: [1, 1, 1, 1]
15 1 0 2
After:  [1, 1, 1, 1]

Before: [0, 1, 0, 3]
2 1 3 2
After:  [0, 1, 0, 3]

Before: [2, 0, 2, 2]
3 2 3 2
After:  [2, 0, 2, 2]

Before: [0, 3, 3, 3]
11 2 2 3
After:  [0, 3, 3, 1]

Before: [0, 1, 2, 2]
3 2 3 3
After:  [0, 1, 2, 2]

Before: [0, 3, 3, 0]
8 0 1 1
After:  [0, 0, 3, 0]

Before: [3, 1, 3, 2]
10 1 3 1
After:  [3, 0, 3, 2]

Before: [3, 2, 2, 3]
12 2 1 2
After:  [3, 2, 1, 3]

Before: [3, 2, 2, 0]
5 2 2 0
After:  [2, 2, 2, 0]

Before: [3, 1, 1, 2]
10 1 3 1
After:  [3, 0, 1, 2]

Before: [3, 0, 3, 1]
11 0 2 2
After:  [3, 0, 1, 1]

Before: [3, 1, 0, 3]
0 1 0 1
After:  [3, 1, 0, 3]

Before: [0, 1, 2, 1]
7 3 2 2
After:  [0, 1, 1, 1]

Before: [2, 1, 2, 0]
12 2 0 1
After:  [2, 1, 2, 0]

Before: [0, 1, 0, 2]
14 0 0 2
After:  [0, 1, 0, 2]

Before: [2, 3, 2, 1]
0 2 0 3
After:  [2, 3, 2, 2]

Before: [1, 1, 0, 2]
10 1 3 1
After:  [1, 0, 0, 2]

Before: [3, 1, 2, 3]
13 3 3 2
After:  [3, 1, 1, 3]

Before: [2, 3, 2, 3]
0 2 0 1
After:  [2, 2, 2, 3]

Before: [3, 1, 2, 3]
1 1 2 3
After:  [3, 1, 2, 0]

Before: [2, 2, 1, 2]
4 0 3 0
After:  [1, 2, 1, 2]

Before: [0, 0, 3, 1]
14 0 0 0
After:  [0, 0, 3, 1]

Before: [3, 2, 3, 0]
11 0 2 3
After:  [3, 2, 3, 1]

Before: [2, 1, 1, 1]
11 0 0 1
After:  [2, 1, 1, 1]

Before: [3, 2, 2, 2]
12 2 1 2
After:  [3, 2, 1, 2]

Before: [0, 1, 3, 2]
10 1 3 2
After:  [0, 1, 0, 2]

Before: [1, 1, 2, 2]
15 1 0 1
After:  [1, 1, 2, 2]

Before: [0, 0, 3, 3]
8 0 2 3
After:  [0, 0, 3, 0]

Before: [2, 0, 0, 0]
11 0 0 1
After:  [2, 1, 0, 0]

Before: [3, 2, 3, 3]
0 3 0 2
After:  [3, 2, 3, 3]

Before: [2, 2, 2, 2]
4 0 3 2
After:  [2, 2, 1, 2]

Before: [1, 1, 1, 3]
15 1 0 0
After:  [1, 1, 1, 3]

Before: [0, 1, 2, 0]
8 0 1 0
After:  [0, 1, 2, 0]

Before: [3, 1, 3, 1]
12 2 3 0
After:  [0, 1, 3, 1]

Before: [1, 1, 2, 2]
3 2 3 2
After:  [1, 1, 2, 2]

Before: [3, 1, 2, 2]
3 2 3 1
After:  [3, 2, 2, 2]

Before: [1, 1, 0, 1]
15 1 0 0
After:  [1, 1, 0, 1]

Before: [2, 3, 1, 3]
2 2 3 3
After:  [2, 3, 1, 0]

Before: [2, 0, 3, 1]
12 2 3 2
After:  [2, 0, 0, 1]

Before: [2, 0, 0, 3]
8 1 0 0
After:  [0, 0, 0, 3]

Before: [1, 1, 2, 0]
15 1 0 0
After:  [1, 1, 2, 0]

Before: [3, 0, 0, 0]
8 2 0 3
After:  [3, 0, 0, 0]

Before: [2, 0, 2, 2]
0 2 0 3
After:  [2, 0, 2, 2]

Before: [2, 0, 2, 2]
4 0 3 3
After:  [2, 0, 2, 1]

Before: [0, 2, 2, 1]
7 3 2 2
After:  [0, 2, 1, 1]

Before: [2, 2, 0, 1]
6 3 3 1
After:  [2, 0, 0, 1]

Before: [2, 1, 1, 2]
10 1 3 2
After:  [2, 1, 0, 2]

Before: [2, 0, 1, 3]
2 2 3 0
After:  [0, 0, 1, 3]

Before: [2, 0, 0, 2]
4 0 3 3
After:  [2, 0, 0, 1]

Before: [1, 2, 2, 2]
3 2 3 0
After:  [2, 2, 2, 2]

Before: [0, 3, 2, 1]
8 0 1 0
After:  [0, 3, 2, 1]

Before: [0, 2, 2, 3]
8 0 3 2
After:  [0, 2, 0, 3]

Before: [0, 2, 2, 0]
5 2 2 3
After:  [0, 2, 2, 2]

Before: [3, 0, 3, 1]
12 2 3 0
After:  [0, 0, 3, 1]

Before: [0, 2, 1, 3]
2 1 3 0
After:  [0, 2, 1, 3]

Before: [1, 1, 2, 2]
1 1 2 0
After:  [0, 1, 2, 2]

Before: [2, 0, 2, 0]
0 2 0 2
After:  [2, 0, 2, 0]

Before: [0, 1, 3, 2]
10 1 3 3
After:  [0, 1, 3, 0]

Before: [1, 1, 2, 0]
15 1 0 3
After:  [1, 1, 2, 1]

Before: [2, 1, 2, 3]
1 1 2 0
After:  [0, 1, 2, 3]

Before: [1, 3, 1, 3]
2 2 3 3
After:  [1, 3, 1, 0]

Before: [2, 3, 2, 0]
12 2 0 1
After:  [2, 1, 2, 0]

Before: [3, 0, 3, 3]
12 3 0 2
After:  [3, 0, 1, 3]

Before: [3, 1, 1, 3]
2 2 3 0
After:  [0, 1, 1, 3]

Before: [3, 2, 2, 3]
2 1 3 3
After:  [3, 2, 2, 0]

Before: [2, 2, 2, 1]
7 3 2 3
After:  [2, 2, 2, 1]

Before: [1, 1, 1, 1]
6 2 3 3
After:  [1, 1, 1, 0]

Before: [2, 3, 2, 3]
5 2 2 2
After:  [2, 3, 2, 3]

Before: [2, 3, 2, 2]
4 0 3 0
After:  [1, 3, 2, 2]

Before: [0, 1, 2, 1]
13 2 2 2
After:  [0, 1, 1, 1]

Before: [1, 3, 2, 2]
9 0 2 3
After:  [1, 3, 2, 0]

Before: [0, 0, 0, 3]
14 0 0 1
After:  [0, 0, 0, 3]

Before: [0, 2, 0, 0]
14 0 0 2
After:  [0, 2, 0, 0]

Before: [1, 3, 2, 1]
9 0 2 3
After:  [1, 3, 2, 0]

Before: [3, 2, 2, 3]
13 3 2 1
After:  [3, 0, 2, 3]

Before: [1, 0, 2, 0]
9 0 2 0
After:  [0, 0, 2, 0]

Before: [0, 3, 2, 1]
5 2 2 1
After:  [0, 2, 2, 1]

Before: [3, 1, 2, 3]
1 1 2 1
After:  [3, 0, 2, 3]

Before: [0, 3, 1, 2]
14 0 0 2
After:  [0, 3, 0, 2]

Before: [2, 1, 1, 3]
13 3 2 1
After:  [2, 0, 1, 3]

Before: [0, 0, 2, 2]
6 3 3 3
After:  [0, 0, 2, 0]

Before: [0, 1, 3, 0]
8 0 2 0
After:  [0, 1, 3, 0]

Before: [1, 1, 1, 2]
15 1 0 2
After:  [1, 1, 1, 2]

Before: [0, 1, 3, 2]
8 0 2 3
After:  [0, 1, 3, 0]

Before: [1, 1, 3, 3]
15 1 0 0
After:  [1, 1, 3, 3]

Before: [2, 2, 1, 2]
11 0 1 0
After:  [1, 2, 1, 2]

Before: [1, 0, 2, 2]
3 2 3 0
After:  [2, 0, 2, 2]

Before: [0, 0, 2, 2]
3 2 3 0
After:  [2, 0, 2, 2]

Before: [2, 2, 2, 2]
3 2 3 0
After:  [2, 2, 2, 2]

Before: [2, 2, 2, 0]
12 2 0 0
After:  [1, 2, 2, 0]

Before: [0, 1, 1, 2]
10 1 3 0
After:  [0, 1, 1, 2]

Before: [0, 0, 0, 2]
14 0 0 3
After:  [0, 0, 0, 0]

Before: [1, 3, 3, 3]
13 3 3 2
After:  [1, 3, 1, 3]

Before: [3, 2, 2, 3]
5 3 3 0
After:  [3, 2, 2, 3]

Before: [1, 1, 3, 1]
15 1 0 1
After:  [1, 1, 3, 1]

Before: [2, 3, 2, 2]
4 0 3 2
After:  [2, 3, 1, 2]

Before: [3, 3, 2, 3]
0 3 0 1
After:  [3, 3, 2, 3]

Before: [1, 1, 2, 0]
9 0 2 3
After:  [1, 1, 2, 0]

Before: [1, 2, 2, 0]
9 0 2 2
After:  [1, 2, 0, 0]

Before: [0, 3, 2, 1]
7 3 2 1
After:  [0, 1, 2, 1]

Before: [2, 0, 2, 3]
5 2 2 0
After:  [2, 0, 2, 3]

Before: [2, 0, 0, 2]
4 0 3 2
After:  [2, 0, 1, 2]

Before: [3, 3, 1, 1]
0 3 0 2
After:  [3, 3, 1, 1]

Before: [0, 3, 3, 0]
14 0 0 1
After:  [0, 0, 3, 0]

Before: [3, 2, 1, 1]
0 3 0 1
After:  [3, 1, 1, 1]

Before: [1, 1, 2, 2]
15 1 0 0
After:  [1, 1, 2, 2]

Before: [2, 2, 1, 2]
6 3 3 0
After:  [0, 2, 1, 2]

Before: [2, 1, 2, 2]
4 0 3 2
After:  [2, 1, 1, 2]

Before: [1, 1, 1, 2]
10 1 3 1
After:  [1, 0, 1, 2]

Before: [1, 1, 0, 0]
15 1 0 0
After:  [1, 1, 0, 0]

Before: [1, 2, 2, 3]
9 0 2 1
After:  [1, 0, 2, 3]

Before: [2, 0, 1, 2]
4 0 3 0
After:  [1, 0, 1, 2]

Before: [1, 3, 3, 3]
12 3 2 3
After:  [1, 3, 3, 1]

Before: [3, 1, 1, 2]
0 1 0 0
After:  [1, 1, 1, 2]

Before: [3, 0, 2, 1]
0 3 0 3
After:  [3, 0, 2, 1]

Before: [3, 3, 0, 1]
0 3 0 0
After:  [1, 3, 0, 1]

Before: [1, 3, 3, 2]
6 3 3 2
After:  [1, 3, 0, 2]

Before: [0, 2, 1, 0]
8 0 2 2
After:  [0, 2, 0, 0]

Before: [2, 2, 2, 0]
12 2 0 2
After:  [2, 2, 1, 0]

Before: [2, 1, 2, 3]
5 2 2 0
After:  [2, 1, 2, 3]

Before: [0, 0, 1, 3]
5 3 3 3
After:  [0, 0, 1, 3]

Before: [1, 0, 2, 3]
13 2 2 2
After:  [1, 0, 1, 3]

Before: [1, 1, 2, 3]
15 1 0 2
After:  [1, 1, 1, 3]

Before: [2, 2, 2, 2]
3 2 3 3
After:  [2, 2, 2, 2]

Before: [1, 1, 0, 1]
15 1 0 2
After:  [1, 1, 1, 1]

Before: [1, 1, 2, 3]
15 1 0 0
After:  [1, 1, 2, 3]

Before: [1, 1, 0, 3]
2 1 3 1
After:  [1, 0, 0, 3]

Before: [2, 0, 2, 1]
12 2 0 1
After:  [2, 1, 2, 1]

Before: [0, 2, 1, 2]
8 0 1 1
After:  [0, 0, 1, 2]

Before: [1, 1, 2, 3]
1 1 2 1
After:  [1, 0, 2, 3]

Before: [0, 3, 2, 3]
2 2 3 0
After:  [0, 3, 2, 3]

Before: [0, 0, 2, 3]
13 3 3 2
After:  [0, 0, 1, 3]

Before: [2, 1, 3, 2]
10 1 3 1
After:  [2, 0, 3, 2]

Before: [1, 1, 2, 3]
2 1 3 3
After:  [1, 1, 2, 0]

Before: [0, 0, 3, 2]
14 0 0 2
After:  [0, 0, 0, 2]

Before: [0, 2, 2, 1]
7 3 2 3
After:  [0, 2, 2, 1]

Before: [1, 0, 3, 2]
11 2 2 3
After:  [1, 0, 3, 1]

Before: [3, 2, 3, 3]
11 0 0 1
After:  [3, 1, 3, 3]

Before: [0, 3, 2, 2]
14 0 0 2
After:  [0, 3, 0, 2]

Before: [3, 2, 1, 1]
6 3 3 2
After:  [3, 2, 0, 1]

Before: [0, 2, 2, 3]
2 2 3 0
After:  [0, 2, 2, 3]

Before: [1, 2, 1, 2]
6 3 3 3
After:  [1, 2, 1, 0]

Before: [2, 1, 2, 1]
7 3 2 1
After:  [2, 1, 2, 1]

Before: [1, 1, 1, 2]
10 1 3 2
After:  [1, 1, 0, 2]

Before: [0, 0, 1, 1]
14 0 0 1
After:  [0, 0, 1, 1]

Before: [3, 3, 3, 1]
11 0 2 1
After:  [3, 1, 3, 1]

Before: [2, 1, 2, 2]
12 2 0 2
After:  [2, 1, 1, 2]

Before: [1, 2, 2, 1]
7 3 2 0
After:  [1, 2, 2, 1]

Before: [1, 2, 2, 2]
9 0 2 1
After:  [1, 0, 2, 2]

Before: [3, 3, 2, 1]
7 3 2 3
After:  [3, 3, 2, 1]

Before: [2, 1, 1, 2]
6 3 3 3
After:  [2, 1, 1, 0]

Before: [2, 2, 1, 3]
2 2 3 2
After:  [2, 2, 0, 3]

Before: [3, 2, 2, 2]
3 2 3 1
After:  [3, 2, 2, 2]

Before: [2, 2, 2, 1]
0 2 0 0
After:  [2, 2, 2, 1]

Before: [0, 1, 3, 1]
14 0 0 1
After:  [0, 0, 3, 1]

Before: [2, 0, 3, 1]
8 1 0 0
After:  [0, 0, 3, 1]

Before: [2, 3, 0, 2]
4 0 3 2
After:  [2, 3, 1, 2]

Before: [2, 0, 2, 2]
3 2 3 1
After:  [2, 2, 2, 2]

Before: [0, 0, 3, 2]
8 0 2 2
After:  [0, 0, 0, 2]

Before: [3, 1, 1, 2]
10 1 3 2
After:  [3, 1, 0, 2]

Before: [3, 2, 2, 1]
7 3 2 2
After:  [3, 2, 1, 1]

Before: [2, 2, 2, 2]
4 0 3 1
After:  [2, 1, 2, 2]

Before: [1, 1, 2, 2]
9 0 2 1
After:  [1, 0, 2, 2]

Before: [3, 0, 2, 2]
5 2 2 1
After:  [3, 2, 2, 2]

Before: [0, 2, 0, 1]
14 0 0 0
After:  [0, 2, 0, 1]

Before: [2, 2, 2, 1]
5 2 2 0
After:  [2, 2, 2, 1]

Before: [2, 1, 2, 3]
1 1 2 1
After:  [2, 0, 2, 3]

Before: [2, 3, 0, 2]
4 0 3 1
After:  [2, 1, 0, 2]

Before: [2, 3, 2, 1]
7 3 2 0
After:  [1, 3, 2, 1]

Before: [2, 0, 2, 2]
12 2 0 0
After:  [1, 0, 2, 2]

Before: [1, 2, 2, 2]
3 2 3 2
After:  [1, 2, 2, 2]

Before: [0, 0, 2, 1]
7 3 2 0
After:  [1, 0, 2, 1]

Before: [2, 2, 3, 3]
11 2 2 3
After:  [2, 2, 3, 1]

Before: [3, 3, 2, 0]
5 2 2 2
After:  [3, 3, 2, 0]

Before: [3, 2, 2, 2]
3 2 3 2
After:  [3, 2, 2, 2]

Before: [2, 3, 2, 2]
4 0 3 3
After:  [2, 3, 2, 1]

Before: [2, 1, 1, 2]
11 0 0 1
After:  [2, 1, 1, 2]

Before: [0, 0, 2, 1]
7 3 2 2
After:  [0, 0, 1, 1]

Before: [0, 2, 1, 0]
14 0 0 3
After:  [0, 2, 1, 0]

Before: [1, 1, 2, 0]
15 1 0 1
After:  [1, 1, 2, 0]

Before: [0, 1, 2, 3]
1 1 2 1
After:  [0, 0, 2, 3]

Before: [0, 3, 1, 0]
14 0 0 3
After:  [0, 3, 1, 0]

Before: [0, 2, 3, 2]
8 0 3 0
After:  [0, 2, 3, 2]

Before: [0, 1, 3, 3]
13 0 0 0
After:  [1, 1, 3, 3]

Before: [2, 1, 2, 0]
1 1 2 0
After:  [0, 1, 2, 0]

Before: [3, 0, 1, 1]
11 0 0 0
After:  [1, 0, 1, 1]

Before: [0, 2, 1, 3]
14 0 0 3
After:  [0, 2, 1, 0]

Before: [0, 2, 2, 1]
14 0 0 0
After:  [0, 2, 2, 1]

Before: [0, 2, 3, 0]
14 0 0 1
After:  [0, 0, 3, 0]

Before: [2, 2, 2, 2]
3 2 3 1
After:  [2, 2, 2, 2]

Before: [3, 0, 2, 1]
7 3 2 3
After:  [3, 0, 2, 1]

Before: [2, 2, 2, 1]
6 3 3 0
After:  [0, 2, 2, 1]

Before: [2, 1, 3, 2]
10 1 3 2
After:  [2, 1, 0, 2]

Before: [2, 1, 2, 2]
5 2 2 3
After:  [2, 1, 2, 2]

Before: [3, 2, 1, 1]
0 3 0 3
After:  [3, 2, 1, 1]

Before: [2, 1, 2, 3]
1 1 2 3
After:  [2, 1, 2, 0]

Before: [2, 3, 2, 0]
0 2 0 1
After:  [2, 2, 2, 0]

Before: [3, 0, 3, 1]
11 0 0 3
After:  [3, 0, 3, 1]

Before: [2, 3, 1, 1]
6 2 3 2
After:  [2, 3, 0, 1]

Before: [2, 0, 3, 2]
11 2 2 0
After:  [1, 0, 3, 2]

Before: [0, 1, 1, 2]
10 1 3 3
After:  [0, 1, 1, 0]

Before: [0, 1, 3, 3]
12 3 2 2
After:  [0, 1, 1, 3]

Before: [0, 1, 1, 2]
14 0 0 1
After:  [0, 0, 1, 2]

Before: [0, 1, 2, 3]
1 1 2 2
After:  [0, 1, 0, 3]

Before: [1, 1, 2, 2]
1 1 2 3
After:  [1, 1, 2, 0]

Before: [0, 1, 0, 1]
14 0 0 3
After:  [0, 1, 0, 0]

Before: [2, 0, 0, 1]
6 3 3 1
After:  [2, 0, 0, 1]

Before: [1, 2, 1, 3]
13 3 2 3
After:  [1, 2, 1, 0]

Before: [2, 1, 2, 1]
6 3 3 3
After:  [2, 1, 2, 0]

Before: [0, 1, 0, 2]
6 3 3 3
After:  [0, 1, 0, 0]

Before: [3, 1, 0, 2]
8 2 0 0
After:  [0, 1, 0, 2]

Before: [1, 1, 3, 3]
12 3 2 0
After:  [1, 1, 3, 3]

Before: [0, 1, 2, 1]
5 2 2 3
After:  [0, 1, 2, 2]

Before: [1, 0, 3, 0]
11 2 2 0
After:  [1, 0, 3, 0]

Before: [3, 3, 2, 1]
5 2 2 0
After:  [2, 3, 2, 1]

Before: [0, 2, 2, 3]
14 0 0 3
After:  [0, 2, 2, 0]

Before: [3, 0, 1, 3]
2 2 3 3
After:  [3, 0, 1, 0]

Before: [2, 3, 3, 2]
4 0 3 3
After:  [2, 3, 3, 1]

Before: [1, 1, 3, 2]
15 1 0 2
After:  [1, 1, 1, 2]

Before: [1, 1, 2, 2]
9 0 2 0
After:  [0, 1, 2, 2]

Before: [2, 1, 2, 2]
10 1 3 0
After:  [0, 1, 2, 2]

Before: [3, 1, 2, 0]
1 1 2 3
After:  [3, 1, 2, 0]

Before: [0, 1, 1, 3]
14 0 0 1
After:  [0, 0, 1, 3]

Before: [1, 1, 2, 3]
13 3 1 0
After:  [0, 1, 2, 3]

Before: [1, 1, 1, 2]
6 3 3 1
After:  [1, 0, 1, 2]

Before: [2, 1, 2, 2]
5 2 2 1
After:  [2, 2, 2, 2]

Before: [0, 2, 2, 0]
14 0 0 0
After:  [0, 2, 2, 0]

Before: [0, 0, 2, 2]
8 0 2 2
After:  [0, 0, 0, 2]

Before: [0, 1, 2, 0]
14 0 0 3
After:  [0, 1, 2, 0]

Before: [1, 3, 2, 2]
9 0 2 1
After:  [1, 0, 2, 2]

Before: [1, 2, 2, 0]
12 2 1 0
After:  [1, 2, 2, 0]

Before: [2, 1, 3, 2]
4 0 3 0
After:  [1, 1, 3, 2]

Before: [0, 1, 2, 1]
1 1 2 1
After:  [0, 0, 2, 1]

Before: [3, 0, 3, 3]
11 0 0 0
After:  [1, 0, 3, 3]

Before: [0, 3, 2, 1]
7 3 2 0
After:  [1, 3, 2, 1]

Before: [3, 1, 1, 3]
12 3 0 0
After:  [1, 1, 1, 3]

Before: [0, 2, 2, 1]
7 3 2 0
After:  [1, 2, 2, 1]

Before: [1, 1, 3, 2]
10 1 3 3
After:  [1, 1, 3, 0]

Before: [1, 1, 2, 1]
1 1 2 1
After:  [1, 0, 2, 1]

Before: [2, 0, 1, 2]
6 3 3 0
After:  [0, 0, 1, 2]

Before: [2, 0, 2, 0]
0 2 0 3
After:  [2, 0, 2, 2]

Before: [0, 2, 3, 3]
13 3 3 0
After:  [1, 2, 3, 3]

Before: [1, 1, 0, 3]
15 1 0 3
After:  [1, 1, 0, 1]

Before: [2, 0, 1, 1]
11 0 0 2
After:  [2, 0, 1, 1]

Before: [2, 3, 0, 2]
6 3 3 2
After:  [2, 3, 0, 2]

Before: [3, 1, 1, 2]
10 1 3 0
After:  [0, 1, 1, 2]

Before: [2, 3, 0, 1]
6 3 3 1
After:  [2, 0, 0, 1]

Before: [3, 1, 2, 1]
1 1 2 0
After:  [0, 1, 2, 1]

Before: [1, 1, 0, 2]
10 1 3 0
After:  [0, 1, 0, 2]

Before: [2, 1, 2, 1]
1 1 2 2
After:  [2, 1, 0, 1]

Before: [2, 1, 0, 2]
10 1 3 2
After:  [2, 1, 0, 2]

Before: [1, 1, 2, 2]
15 1 0 2
After:  [1, 1, 1, 2]

Before: [2, 3, 0, 2]
4 0 3 0
After:  [1, 3, 0, 2]

Before: [1, 1, 2, 1]
1 1 2 0
After:  [0, 1, 2, 1]

Before: [3, 1, 2, 3]
13 3 3 0
After:  [1, 1, 2, 3]

Before: [3, 0, 2, 3]
0 3 0 1
After:  [3, 3, 2, 3]

Before: [0, 1, 2, 1]
1 1 2 0
After:  [0, 1, 2, 1]

Before: [2, 2, 1, 2]
4 0 3 3
After:  [2, 2, 1, 1]

Before: [3, 3, 0, 3]
11 0 0 0
After:  [1, 3, 0, 3]

Before: [3, 3, 2, 2]
3 2 3 1
After:  [3, 2, 2, 2]

Before: [1, 3, 2, 3]
2 2 3 0
After:  [0, 3, 2, 3]

Before: [1, 2, 2, 3]
9 0 2 0
After:  [0, 2, 2, 3]

Before: [2, 1, 2, 0]
1 1 2 2
After:  [2, 1, 0, 0]

Before: [3, 1, 2, 1]
1 1 2 2
After:  [3, 1, 0, 1]

Before: [3, 1, 0, 2]
10 1 3 1
After:  [3, 0, 0, 2]

Before: [3, 0, 3, 1]
12 2 3 2
After:  [3, 0, 0, 1]

Before: [1, 0, 2, 2]
9 0 2 3
After:  [1, 0, 2, 0]

Before: [0, 2, 2, 3]
5 3 3 1
After:  [0, 3, 2, 3]

Before: [2, 0, 2, 1]
12 2 0 2
After:  [2, 0, 1, 1]

Before: [2, 3, 1, 2]
11 0 0 3
After:  [2, 3, 1, 1]

Before: [0, 2, 2, 2]
14 0 0 0
After:  [0, 2, 2, 2]

Before: [1, 0, 3, 0]
11 2 2 2
After:  [1, 0, 1, 0]

Before: [0, 1, 2, 3]
14 0 0 0
After:  [0, 1, 2, 3]

Before: [2, 2, 3, 1]
6 3 3 3
After:  [2, 2, 3, 0]

Before: [1, 1, 2, 2]
10 1 3 0
After:  [0, 1, 2, 2]

Before: [3, 1, 2, 2]
6 3 3 1
After:  [3, 0, 2, 2]

Before: [1, 2, 3, 3]
13 3 1 2
After:  [1, 2, 0, 3]

Before: [1, 2, 1, 3]
2 2 3 2
After:  [1, 2, 0, 3]

Before: [3, 1, 0, 2]
10 1 3 3
After:  [3, 1, 0, 0]

Before: [3, 1, 3, 3]
11 2 2 3
After:  [3, 1, 3, 1]

Before: [2, 2, 1, 2]
11 0 0 2
After:  [2, 2, 1, 2]

Before: [3, 1, 3, 2]
10 1 3 0
After:  [0, 1, 3, 2]

Before: [3, 0, 2, 2]
3 2 3 2
After:  [3, 0, 2, 2]

Before: [1, 1, 0, 3]
2 1 3 0
After:  [0, 1, 0, 3]

Before: [2, 1, 2, 2]
1 1 2 3
After:  [2, 1, 2, 0]

Before: [2, 2, 2, 3]
2 2 3 2
After:  [2, 2, 0, 3]

Before: [3, 0, 2, 1]
7 3 2 1
After:  [3, 1, 2, 1]

Before: [1, 1, 2, 3]
9 0 2 0
After:  [0, 1, 2, 3]

Before: [3, 2, 2, 3]
2 1 3 2
After:  [3, 2, 0, 3]

Before: [2, 1, 2, 2]
4 0 3 1
After:  [2, 1, 2, 2]

Before: [2, 0, 2, 2]
4 0 3 0
After:  [1, 0, 2, 2]

Before: [2, 3, 1, 2]
4 0 3 2
After:  [2, 3, 1, 2]

Before: [0, 2, 1, 0]
8 0 2 3
After:  [0, 2, 1, 0]

Before: [3, 0, 1, 1]
6 2 3 3
After:  [3, 0, 1, 0]

Before: [1, 2, 2, 0]
12 2 1 2
After:  [1, 2, 1, 0]

Before: [1, 3, 2, 1]
9 0 2 2
After:  [1, 3, 0, 1]

Before: [1, 1, 1, 3]
15 1 0 1
After:  [1, 1, 1, 3]

Before: [0, 0, 0, 3]
8 0 3 2
After:  [0, 0, 0, 3]

Before: [3, 1, 2, 0]
1 1 2 2
After:  [3, 1, 0, 0]

Before: [2, 1, 2, 2]
10 1 3 2
After:  [2, 1, 0, 2]

Before: [1, 1, 0, 1]
15 1 0 1
After:  [1, 1, 0, 1]

Before: [1, 1, 3, 0]
13 2 1 0
After:  [0, 1, 3, 0]

Before: [0, 0, 2, 1]
7 3 2 1
After:  [0, 1, 2, 1]

Before: [2, 1, 3, 0]
11 0 0 3
After:  [2, 1, 3, 1]

Before: [3, 1, 3, 0]
0 1 0 3
After:  [3, 1, 3, 1]

Before: [1, 1, 3, 3]
13 2 1 1
After:  [1, 0, 3, 3]

Before: [1, 3, 2, 3]
9 0 2 3
After:  [1, 3, 2, 0]

Before: [0, 3, 1, 3]
8 0 3 1
After:  [0, 0, 1, 3]

Before: [2, 1, 0, 2]
4 0 3 3
After:  [2, 1, 0, 1]

Before: [2, 0, 2, 2]
3 2 3 3
After:  [2, 0, 2, 2]

Before: [2, 3, 1, 0]
11 0 0 0
After:  [1, 3, 1, 0]

Before: [3, 2, 3, 2]
11 0 0 2
After:  [3, 2, 1, 2]

Before: [2, 1, 2, 2]
4 0 3 3
After:  [2, 1, 2, 1]

Before: [3, 0, 3, 3]
5 3 3 1
After:  [3, 3, 3, 3]

Before: [2, 2, 2, 1]
7 3 2 1
After:  [2, 1, 2, 1]

Before: [2, 1, 2, 2]
3 2 3 2
After:  [2, 1, 2, 2]

Before: [1, 1, 2, 1]
7 3 2 2
After:  [1, 1, 1, 1]

Before: [2, 0, 2, 2]
5 2 2 0
After:  [2, 0, 2, 2]

Before: [2, 1, 3, 2]
4 0 3 1
After:  [2, 1, 3, 2]

Before: [0, 2, 2, 2]
3 2 3 3
After:  [0, 2, 2, 2]

Before: [0, 3, 2, 2]
14 0 0 0
After:  [0, 3, 2, 2]

Before: [2, 1, 3, 2]
10 1 3 0
After:  [0, 1, 3, 2]

Before: [3, 1, 2, 1]
7 3 2 0
After:  [1, 1, 2, 1]

Before: [2, 2, 1, 2]
4 0 3 2
After:  [2, 2, 1, 2]

Before: [3, 2, 1, 1]
11 0 0 2
After:  [3, 2, 1, 1]

Before: [0, 3, 3, 1]
13 0 0 1
After:  [0, 1, 3, 1]

Before: [3, 0, 2, 3]
13 3 2 2
After:  [3, 0, 0, 3]

Before: [0, 0, 0, 1]
6 3 3 2
After:  [0, 0, 0, 1]

Before: [2, 3, 1, 2]
4 0 3 1
After:  [2, 1, 1, 2]

Before: [2, 3, 2, 3]
0 2 0 3
After:  [2, 3, 2, 2]

Before: [1, 3, 2, 0]
9 0 2 0
After:  [0, 3, 2, 0]

Before: [0, 1, 0, 2]
6 3 3 0
After:  [0, 1, 0, 2]

Before: [0, 1, 2, 1]
1 1 2 2
After:  [0, 1, 0, 1]

Before: [1, 3, 2, 1]
7 3 2 0
After:  [1, 3, 2, 1]

Before: [0, 3, 2, 1]
8 0 2 1
After:  [0, 0, 2, 1]

Before: [2, 2, 0, 3]
5 3 3 1
After:  [2, 3, 0, 3]

Before: [1, 1, 2, 2]
3 2 3 3
After:  [1, 1, 2, 2]

Before: [0, 0, 3, 2]
11 2 2 1
After:  [0, 1, 3, 2]

Before: [0, 3, 1, 3]
2 2 3 3
After:  [0, 3, 1, 0]

Before: [3, 3, 3, 3]
11 2 0 0
After:  [1, 3, 3, 3]

Before: [2, 0, 0, 2]
4 0 3 0
After:  [1, 0, 0, 2]

Before: [0, 1, 2, 3]
2 2 3 1
After:  [0, 0, 2, 3]

Before: [2, 3, 2, 1]
7 3 2 2
After:  [2, 3, 1, 1]

Before: [3, 1, 2, 2]
10 1 3 0
After:  [0, 1, 2, 2]

Before: [0, 2, 3, 3]
14 0 0 3
After:  [0, 2, 3, 0]

Before: [3, 2, 2, 3]
13 3 1 1
After:  [3, 0, 2, 3]

Before: [1, 1, 2, 2]
9 0 2 3
After:  [1, 1, 2, 0]

Before: [0, 2, 1, 3]
14 0 0 2
After:  [0, 2, 0, 3]

Before: [1, 0, 2, 1]
7 3 2 3
After:  [1, 0, 2, 1]

Before: [0, 3, 2, 1]
7 3 2 3
After:  [0, 3, 2, 1]

Before: [0, 1, 3, 2]
11 2 2 0
After:  [1, 1, 3, 2]

Before: [0, 0, 2, 0]
13 0 0 2
After:  [0, 0, 1, 0]

Before: [3, 1, 1, 3]
11 0 0 2
After:  [3, 1, 1, 3]

Before: [3, 2, 1, 3]
0 3 0 3
After:  [3, 2, 1, 3]

Before: [1, 2, 2, 0]
9 0 2 0
After:  [0, 2, 2, 0]

Before: [3, 0, 0, 3]
0 3 0 0
After:  [3, 0, 0, 3]

Before: [1, 0, 1, 3]
2 2 3 0
After:  [0, 0, 1, 3]

Before: [0, 0, 2, 1]
7 3 2 3
After:  [0, 0, 2, 1]

Before: [1, 1, 2, 2]
15 1 0 3
After:  [1, 1, 2, 1]

Before: [2, 1, 1, 3]
2 1 3 0
After:  [0, 1, 1, 3]

Before: [0, 2, 0, 2]
8 0 3 0
After:  [0, 2, 0, 2]

Before: [3, 1, 0, 3]
0 3 0 0
After:  [3, 1, 0, 3]

Before: [2, 3, 2, 3]
2 2 3 1
After:  [2, 0, 2, 3]

Before: [2, 1, 2, 3]
0 2 0 0
After:  [2, 1, 2, 3]

Before: [2, 0, 2, 3]
8 1 0 3
After:  [2, 0, 2, 0]

Before: [1, 1, 2, 3]
2 2 3 1
After:  [1, 0, 2, 3]

Before: [0, 0, 2, 2]
8 0 3 1
After:  [0, 0, 2, 2]

Before: [1, 0, 2, 1]
7 3 2 0
After:  [1, 0, 2, 1]

Before: [1, 3, 2, 3]
9 0 2 2
After:  [1, 3, 0, 3]

Before: [1, 1, 3, 3]
11 2 2 1
After:  [1, 1, 3, 3]

Before: [1, 1, 0, 3]
15 1 0 1
After:  [1, 1, 0, 3]

Before: [2, 3, 3, 2]
4 0 3 1
After:  [2, 1, 3, 2]

Before: [2, 1, 0, 1]
6 3 3 0
After:  [0, 1, 0, 1]

Before: [1, 1, 2, 2]
10 1 3 2
After:  [1, 1, 0, 2]

Before: [2, 0, 2, 1]
7 3 2 3
After:  [2, 0, 2, 1]

Before: [2, 3, 2, 2]
13 2 2 3
After:  [2, 3, 2, 1]

Before: [0, 1, 1, 0]
14 0 0 0
After:  [0, 1, 1, 0]

Before: [0, 1, 3, 2]
14 0 0 1
After:  [0, 0, 3, 2]

Before: [0, 3, 2, 3]
8 0 1 2
After:  [0, 3, 0, 3]

Before: [2, 3, 1, 3]
2 2 3 0
After:  [0, 3, 1, 3]

Before: [0, 0, 1, 1]
8 0 2 0
After:  [0, 0, 1, 1]

Before: [0, 1, 0, 2]
10 1 3 0
After:  [0, 1, 0, 2]

Before: [2, 3, 3, 3]
5 3 3 3
After:  [2, 3, 3, 3]

Before: [0, 3, 2, 1]
7 3 2 2
After:  [0, 3, 1, 1]

Before: [1, 0, 2, 3]
2 2 3 1
After:  [1, 0, 2, 3]

Before: [2, 1, 2, 1]
7 3 2 3
After:  [2, 1, 2, 1]

Before: [3, 1, 1, 1]
0 1 0 0
After:  [1, 1, 1, 1]

Before: [2, 3, 0, 3]
5 3 3 3
After:  [2, 3, 0, 3]

Before: [2, 0, 2, 0]
13 2 2 0
After:  [1, 0, 2, 0]

Before: [3, 2, 2, 3]
13 3 2 2
After:  [3, 2, 0, 3]

Before: [2, 0, 2, 1]
0 2 0 2
After:  [2, 0, 2, 1]

Before: [3, 1, 2, 0]
1 1 2 0
After:  [0, 1, 2, 0]

Before: [1, 2, 2, 1]
9 0 2 3
After:  [1, 2, 2, 0]

Before: [3, 0, 1, 1]
0 3 0 0
After:  [1, 0, 1, 1]

Before: [3, 1, 3, 3]
0 1 0 2
After:  [3, 1, 1, 3]

Before: [0, 1, 1, 3]
2 1 3 1
After:  [0, 0, 1, 3]

Before: [0, 3, 3, 3]
5 3 3 1
After:  [0, 3, 3, 3]

Before: [3, 3, 2, 2]
13 2 2 3
After:  [3, 3, 2, 1]

Before: [1, 1, 2, 1]
1 1 2 3
After:  [1, 1, 2, 0]

Before: [1, 1, 3, 2]
15 1 0 0
After:  [1, 1, 3, 2]

Before: [1, 0, 2, 2]
5 2 2 1
After:  [1, 2, 2, 2]

Before: [2, 2, 1, 1]
11 0 1 1
After:  [2, 1, 1, 1]

Before: [0, 0, 3, 1]
14 0 0 1
After:  [0, 0, 3, 1]

Before: [2, 1, 2, 2]
10 1 3 1
After:  [2, 0, 2, 2]

Before: [0, 1, 0, 2]
10 1 3 3
After:  [0, 1, 0, 0]

Before: [3, 1, 2, 2]
1 1 2 3
After:  [3, 1, 2, 0]

Before: [1, 0, 2, 1]
9 0 2 3
After:  [1, 0, 2, 0]

Before: [2, 1, 2, 2]
1 1 2 1
After:  [2, 0, 2, 2]

Before: [2, 3, 1, 2]
4 0 3 0
After:  [1, 3, 1, 2]

Before: [2, 1, 3, 3]
5 3 3 3
After:  [2, 1, 3, 3]

Before: [2, 2, 3, 3]
2 1 3 0
After:  [0, 2, 3, 3]

Before: [1, 1, 3, 2]
15 1 0 1
After:  [1, 1, 3, 2]

Before: [2, 3, 2, 1]
7 3 2 1
After:  [2, 1, 2, 1]

Before: [1, 0, 2, 0]
9 0 2 2
After:  [1, 0, 0, 0]

Before: [3, 3, 2, 3]
5 2 2 1
After:  [3, 2, 2, 3]

Before: [3, 1, 2, 2]
1 1 2 1
After:  [3, 0, 2, 2]

Before: [0, 0, 2, 3]
2 2 3 3
After:  [0, 0, 2, 0]

Before: [3, 3, 1, 3]
2 2 3 0
After:  [0, 3, 1, 3]

Before: [2, 2, 2, 3]
0 2 0 1
After:  [2, 2, 2, 3]

Before: [3, 1, 2, 1]
0 1 0 2
After:  [3, 1, 1, 1]

Before: [3, 3, 2, 1]
7 3 2 0
After:  [1, 3, 2, 1]

Before: [0, 1, 2, 0]
1 1 2 2
After:  [0, 1, 0, 0]

Before: [0, 0, 1, 0]
14 0 0 0
After:  [0, 0, 1, 0]

Before: [0, 2, 2, 1]
12 2 1 3
After:  [0, 2, 2, 1]

Before: [3, 2, 3, 1]
6 3 3 3
After:  [3, 2, 3, 0]

Before: [1, 1, 2, 1]
1 1 2 2
After:  [1, 1, 0, 1]

Before: [2, 3, 1, 2]
4 0 3 3
After:  [2, 3, 1, 1]

Before: [2, 2, 1, 2]
4 0 3 1
After:  [2, 1, 1, 2]

Before: [2, 1, 1, 2]
4 0 3 0
After:  [1, 1, 1, 2]`;

export default input;
