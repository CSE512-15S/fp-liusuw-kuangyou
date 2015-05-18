from Bio import SeqIO
from scipy import stats
import sys


# Creates an entropy CSV file of each column
# given a fasta file, pass in as command line argument (No suffix needed)
# Creates a new csv file and calculate that
def main():
    GET_input = sys.argv[1]
    filepath = "../fasta/" + GET_input + ".fasta"

    ids = []
    seqs = []

    # parse in all the file
    for seq_record in SeqIO.parse(filepath, "fasta"):
        ids.append(seq_record.id)
        seqs.append(seq_record.seq)

    entropies = calculate(seqs)
    write_each_col_aa(ids, seqs)

    f = open("../output/" + GET_input + "_entropies.csv", "w")
    f.write("index,entropy\n")
    # dummy varible
    f.write("0,0\n")
    # Using 1-base index
    for i in range(0, len(entropies)):
        f.write(str(i + 1) + ", " + str(entropies[i]) + "\n")
    f.close()
    print "CSV written"


def calculate(seqs):
    column_entropy = []
    sequence_length = len(seqs[0])
    for col in range(0, sequence_length):
        col_aa = []
        for seq_id in range(0, len(seqs)):
            col_aa.append(seqs[seq_id][col])
        column_entropy.append(calculate_entropy(col_aa))
    return column_entropy


# aa: stands of amino acid
# Calculate of a column vector of Amino Acid
def calculate_entropy(col_aa):
    mapping = dict()
    for i in range(0, len(col_aa)):
        curr_aa = col_aa[i]
        # Ignoring Gaps as Andrew suggested
        if curr_aa != "-":
            if curr_aa not in mapping:
                mapping[curr_aa] = 0
            mapping[curr_aa] += 1

    total_aa_count = 0
    # Counting total occurances
    for key, value in mapping.iteritems():
        total_aa_count += value
    pk = []
    # Forming probabilities vector
    for key, value in mapping.iteritems():
        pk.append(float(value) / total_aa_count)
    return stats.entropy(pk)


def write_each_col_aa(ids, seqs):
    # Skipping the consensus version
    for i in range(1, len(ids)):
        print ids[i], seqs[i]


main()
