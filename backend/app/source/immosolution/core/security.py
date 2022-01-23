def is_admin(token_info):
    """
        returns true if the token has the ADMIN role
    """
    return token_info["role"] == 'ADMIN'
