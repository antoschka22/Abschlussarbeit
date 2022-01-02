def is_admin(token_info):
    """
        returns true if the token has the ADMIN role
    """
    return token_info["role"] == 'ADMIN'

# def is_user(token_info):
#     return token_info["role"] == 'user' or token_info["role"] == 'admin'