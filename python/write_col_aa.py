#!/usr/bin/env python
from Bio import SeqIO
import sys
import os
import compare_consensus as cc


# Takes in two argument from command line
# fasta file name, and index of interests
def main():
    GET_input = sys.argv[1]  # Patient fasta alignment file
    index = int(sys.argv[2])
    emp1 = cc.compare_consensus(GET_input)
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

        curr_aa_freq = emp1.get_aa_freq(index, seq_record.seq[index-1])
        curr_consensus_freq = emp1.get_consensus_aa_freq(index)

        # return text would be <animo acid>-<curr aa freq>-<consencus aa freq>
        color_coding = "-" + str(curr_aa_freq) + "-" + str(curr_consensus_freq)
        # Switch from index 1 to index 0
        curr_aa = seq_record.seq[index - 1] + color_coding
        # Assuming ID has form 1V##X### (# are numbers)
        curr_version = curr_id[2: 4]
        if curr_version not in mapping:
            mapping[curr_version] = []
        mapping[curr_version].append(curr_aa)
        i += 1

    write_to_json(mapping, GET_input, index)


def write_to_json(mapping, GET_input, index):
    if not os.path.exists("output/" + GET_input):
        os.makedirs("output/" + GET_input)

    f = open("output/" + GET_input + "/" + GET_input + "-" + str(index) + ".json", "wb")
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
