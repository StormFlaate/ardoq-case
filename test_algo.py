import unittest
import algo_case


class Test(unittest.TestCase):
    def test_higest_prod(self):
        result1 = algo_case.highest_prod([1, 10, 2, 6, 5, 3])
        self.assertEqual(result1, 300)

        result2 = algo_case.highest_prod([-10, 10, -20, 6, 5, 3])
        self.assertEqual(result2, 2000)

        result3 = algo_case.highest_prod([-10, -10, -20])
        self.assertEqual(result3, -2000)

        result4 = algo_case.highest_prod([100, -100, -100, 100])
        self.assertEqual(result4, 1000000)

        result4 = algo_case.highest_prod([100, 100, 100, 100])
        self.assertEqual(result4, 1000000)








        