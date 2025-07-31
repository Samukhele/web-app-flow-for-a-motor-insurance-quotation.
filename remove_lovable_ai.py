def commit_callback(commit):
    if commit.author_name == b"Lovable AI" or commit.committer_name == b"Lovable AI":
        commit.skip()
