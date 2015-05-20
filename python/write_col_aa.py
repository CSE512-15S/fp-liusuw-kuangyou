#!/usr/bin/env python
from Bio import SeqIO
import sys


# Takes in two argument from command line
# fasta file name, and index of interests
def main():
    GET_input = sys.argv[1]
    index = int(sys.argv[2])
    filepath = "fasta/" + GET_input + ".fasta"

    # parse in all the file
    i = 0
    mapping = dict()
    for seq_record in SeqIO.parse(filepath, "fasta"):
        # Skipping the first one, the consensus
        if i == 0:
            i += 1
            continue
        curr_id = seq_record.id
        color_coding = ""   # To be filled
        # Switch from index 1 to index 0
        curr_aa = seq_record.seq[index - 1] + color_coding
        # Assuming ID has form 1V##X### (# are numbers)
        curr_version = curr_id[2: curr_id.index("X")]
        if curr_version not in mapping:
            mapping[curr_version] = []
        mapping[curr_version].append(curr_aa)

    write_to_json(mapping, GET_input, index)


def write_to_json(mapping, GET_input, index):
    f = open("output/" + GET_input + "-" + str(index) + ".json", "wb")
    i = 0
    f.write("[\n")
    for key, value in sorted(mapping.iteritems()):
        if i != len(mapping) - 1:
            f.write('\t{ "V": "' + str(key) + '", "aa": ' + to_string(value) + ' },\n')
        else:
            f.write('\t{ "V": "' + str(key) + '", "aa": ' + to_string(value) + ' }\n')
        i += 1
    f.write("]")
    f.close()


def to_string(l):
    res = '["' + l[0] + '"'
    for i in range(1, len(l)):
        res += ', "' + l[i] + '"'
    res += "]"
    return res

main()
